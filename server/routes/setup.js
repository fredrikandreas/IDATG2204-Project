const express = require('express');
const router = express.Router();
const db = require('../db'); // Make sure the path is correct

// Setup route to create tables and insert sample data
router.get('/', async (req, res) => {
  try {
    // 1. Create Product table
    await db.query(`
      CREATE TABLE IF NOT EXISTS Product (
        ProductID INT AUTO_INCREMENT PRIMARY KEY,
        ProductName VARCHAR(100) NOT NULL,
        Price DECIMAL(10,2) NOT NULL,
        StockQuantity INT NOT NULL
      );
    `);

    // 2. Insert sample products
    await db.query(`
      INSERT INTO Product (ProductName, Price, StockQuantity)
      VALUES
        ('Laptop', 999.99, 10),
        ('Smartphone', 599.99, 20),
        ('Tablet', 299.99, 15);
    `);

    res.send('✅ Product table created and sample products inserted!');
  } catch (error) {
    console.error('Error setting up database:', error);
    res.status(500).json({ error: 'Database setup failed' });
  }
});

module.exports = router;
