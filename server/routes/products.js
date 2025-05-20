const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM product');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'DB error' });
  }
});

// Get product by filter

router.post('/filter', async (req, res) => {
  const { brand, category, sort } = req.body;

  let query = 'SELECT * FROM product WHERE 1=1';
  const params = [];
  let idx = 1;

  if (brand) {
    query += ` AND brand_id = $${idx++}`;
    params.push(brand);
  }
  if (category) {
    query += ` AND category_id = $${idx++}`;
    params.push(category);
  }

  if (sort === 'asc') {
    query += ' ORDER BY price ASC';
  } else if (sort === 'desc') {
    query += ' ORDER BY price DESC';
  }

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error filtering products:', error);
    res.status(500).json({ error: 'DB error' });
  }
});

// Get product by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('SELECT * FROM product WHERE product_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'DB error' });
  }
});
module.exports = router;
