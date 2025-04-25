const express = require('express');
const cors = require('cors');
const db = require('./db'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());



app.get('/api/test-db', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT DATABASE() AS db');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ connectedTo: rows[0].db });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'DB error' });
    }
  });
  

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
