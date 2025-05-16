const express = require('express');
const router = express.Router();
const db = require('../db');

// Setup route to create tables and insert sample data
router.get('/', async (req, res) => {
  try {
    // Execute all statements in one go
    await db.query(`
     INSERT INTO product (name, description, price, stock_quantity, brand_id, category_id, image_url)
VALUES 
  ('iPhone 14 Pro', 'Apple smartphone with A16 Bionic chip and 48MP camera', 1299.99, 50, 1, 1, '/uploads/iphone14pro.jpg'),
  ('Galaxy S23 Ultra', 'Samsung flagship phone with 200MP camera and S Pen', 1199.00, 40, 2, 1, '/uploads/galaxys23ultra.jpg'),
  ('Sony Alpha A7 IV', 'Mirrorless camera with 33MP sensor and 4K video', 2499.00, 15, 3, 3, '/uploads/sonya7iv.jpg'),
  ('MacBook Air M2', 'Lightweight Apple laptop with M2 chip and 13.6-inch display', 999.00, 30, 1, 2, '/uploads/macbookairm2.jpg'),
  ('Galaxy Book3 Pro', 'Samsung laptop with Intel i7 and AMOLED display', 1399.00, 25, 2, 2, '/uploads/galaxybook3pro.jpg'),
  ('Sony ZV-E10', 'Compact vlog camera with interchangeable lenses', 749.00, 20, 3, 3, '/uploads/sonyzve10.jpg');

    `);
    
    res.send(' Database setup completed successfully!');
  } catch (error) {
    console.error(' Error setting up database:', error);
    res.status(500).json({ 
      error: 'Database setup failed',
      details: error.message 
    });
  }
});

module.exports = router;