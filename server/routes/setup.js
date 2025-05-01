const express = require('express');
const router = express.Router();
const db = require('../db');

// Setup route to create tables and insert sample data
router.get('/', async (req, res) => {
  try {
    // 1. Create Product table
    await db.query(`
      CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        quantity INT NOT NULL
      );
    `);

    // 2. Insert sample products (if not already inserted)
    await db.query(`
      INSERT INTO product (name, price, quantity)
      VALUES
        ('Laptop', 999.99, 10),
        ('Smartphone', 599.99, 20),
        ('Tablet', 299.99, 15)
      ON CONFLICT DO NOTHING;
    `);

    res.send('✅ Product table created and sample products inserted!');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    res.status(500).json({ error: 'Database setup failed' });
  }
});

module.exports = router;
