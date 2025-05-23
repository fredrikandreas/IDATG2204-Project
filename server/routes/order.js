const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const user_id = req.user.id; // Get user_id from the JWT token
  const { product_id, quantity, price } = req.body;

  if (!user_id || !product_id || !quantity || !price) {
    return res.status(400).json({ error: 'Missing user_id, product_id, quantity, or price' });
  }

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // 1. Check for existing processing order
    let orderResult = await client.query(
      'SELECT order_id, total_amount FROM "order" WHERE user_id = $1 AND status = $2',
      [user_id, 'PROCESSING']
    );

    let order_id;
    if (orderResult.rows.length > 0) {
      // Existing order: add item and update total_amount
      order_id = orderResult.rows[0].order_id;
      const newTotal = Number(orderResult.rows[0].total_amount) + (quantity * price);

      // Check if the product already exists in the order_item table
      const existingItemResult = await client.query(
        'SELECT quantity FROM order_item WHERE order_id = $1 AND product_id = $2',
        [order_id, product_id]
      );

      if (existingItemResult.rows.length > 0) {
        // Product already exists, update the quantity
        const newQuantity = Number(existingItemResult.rows[0].quantity) + quantity;
        await client.query(
          'UPDATE order_item SET quantity = $1 WHERE order_id = $2 AND product_id = $3',
          [newQuantity, order_id, product_id]
        );
      } else {
        // Product does not exist, insert a new row
        await client.query(
          'INSERT INTO order_item (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
          [order_id, product_id, quantity, price]
        );
      }

      // Update the total amount in the order table
      await client.query(
        'UPDATE "order" SET total_amount = $1 WHERE order_id = $2',
        [newTotal, order_id]
      );
    } else {
      // No processing order: create new
      const newOrder = await client.query(
        'INSERT INTO "order" (user_id, order_date, total_amount, status) VALUES ($1, NOW(), $2, $3) RETURNING order_id',
        [user_id, quantity * price, 'PROCESSING']
      );
      order_id = newOrder.rows[0].order_id;

      await client.query(
        'INSERT INTO order_item (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
        [order_id, product_id, quantity, price]
      );
    }

    // 2. Decrement stock_quantity in the product table
    const stockUpdateResult = await client.query(
      'UPDATE product SET stock_quantity = stock_quantity - $1 WHERE product_id = $2 AND stock_quantity >= $1',
      [quantity, product_id]
    );

    if (stockUpdateResult.rowCount === 0) {
      throw new Error('Insufficient stock for the product');
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Item added to cart', order_id });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: error.message || 'DB error' });
  } finally {
    client.release();
  }
});

// Get all order items for a user_id (from the current processing order)
router.get('/cart',auth, async (req, res) => {
  const user_id = req.user.id; // Get user_id from the JWT token

  try {
    // Find the processing order for the user
    const orderResult = await db.query(
      'SELECT order_id FROM "order" WHERE user_id = $1 AND status = $2',
      [user_id, 'PROCESSING']
    );

    if (orderResult.rows.length === 0) {
      return res.json([]);
    }

    const order_id = orderResult.rows[0].order_id;

    // Get all items for this order
    const itemsResult = await db.query(
      'SELECT * FROM order_item WHERE order_id = $1',
      [order_id]
    );

    res.json(itemsResult.rows);
  } catch (error) {
    console.error('Error fetching order items:', error);
    res.status(500).json({ error: 'DB error' });
  }
});

// Pay for the order
router.get('/pay', auth, async (req, res) => {
  const user_id = req.user.id; // Get user_id from the JWT token

  try {
    // Find the processing order for the user
    const orderResult = await db.query(
      'SELECT order_id, total_amount FROM "order" WHERE user_id = $1 AND status = $2',
      [user_id, 'PROCESSING']
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'No processing order found for this user' });
    }

    const order_id = orderResult.rows[0].order_id;
    const amount = orderResult.rows[0].total_amount;

    // Insert payment record
    await db.query(
      'INSERT INTO payment (order_id, amount, payment_method, payment_date, status) VALUES ($1, $2, $3, NOW(), $4)',
      [order_id, amount, 'PayPal', 'COMPLETED']
    );

    // Update the order status to SHIPPED (or PAID if you prefer)
    await db.query(
      'UPDATE "order" SET status = $1 WHERE order_id = $2',
      ['SHIPPED', order_id]
    );

    res.json({ message: 'Order paid successfully' });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'DB error' });
  }
});

router.post('/delete', auth, async (req, res) => {
  const user_id = req.user.id; // Get user_id from the JWT token
  const { product_id, quantity } = req.body;

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ error: 'Missing user_id, product_id, or quantity' });
  }

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Find the processing order for the user
    const orderResult = await client.query(
      'SELECT order_id, total_amount FROM "order" WHERE user_id = $1 AND status = $2',
      [user_id, 'PROCESSING']
    );

    if (orderResult.rows.length === 0) {
      throw new Error('No processing order found for this user');
    }

    const order_id = orderResult.rows[0].order_id;

    // Get the price of the item being deleted
    const itemResult = await client.query(
      'SELECT quantity, unit_price FROM order_item WHERE order_id = $1 AND product_id = $2',
      [order_id, product_id]
    );

    if (itemResult.rows.length === 0) {
      throw new Error('Item not found in the order');
    }

    const { quantity: itemQuantity, unit_price } = itemResult.rows[0];
    const itemTotal = itemQuantity * unit_price;

    // Delete the item from the order_item table
    await client.query(
      'DELETE FROM order_item WHERE order_id = $1 AND product_id = $2',
      [order_id, product_id]
    );

    // Update the total amount in the order table
    const newTotalAmount = Number(orderResult.rows[0].total_amount) - itemTotal;
    await client.query(
      'UPDATE "order" SET total_amount = $1 WHERE order_id = $2',
      [newTotalAmount, order_id]
    );

    // Increment the stock_quantity in the product table
    await client.query(
      'UPDATE product SET stock_quantity = stock_quantity + $1 WHERE product_id = $2',
      [quantity, product_id]
    );

    // Check if there are any remaining items in the order
    const remainingItemsResult = await client.query(
      'SELECT COUNT(*) AS item_count FROM order_item WHERE order_id = $1',
      [order_id]
    );

    const itemCount = parseInt(remainingItemsResult.rows[0].item_count, 10);

    if (itemCount === 0) {
      // No items left, delete the order
      await client.query(
        'DELETE FROM "order" WHERE order_id = $1',
        [order_id]
      );
    }

    await client.query('COMMIT');
    res.json({ message: 'Item removed from cart and stock updated' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'DB error' });
  } finally {
    client.release();
  }
});

// Get the total amount for the current processing order
router.get('/total-amount', auth, async (req, res) => {
  const user_id = req.user.id; // Get user_id from the JWT token

  try {
    // Find the processing order for the user
    const orderResult = await db.query(
      'SELECT total_amount FROM "order" WHERE user_id = $1 AND status = $2',
      [user_id, 'PROCESSING']
    );

    if (orderResult.rows.length === 0) {
      return res.json({ total_amount: 0 }); // No processing order, total is 0
    }

    const total_amount = orderResult.rows[0].total_amount;

    res.json({ total_amount });
  } catch (error) {
    console.error('Error fetching total amount:', error);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;