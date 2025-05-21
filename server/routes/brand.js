const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM brand');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({ error: 'DB error' });
    }
});

module.exports = router;