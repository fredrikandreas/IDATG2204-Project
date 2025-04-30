const express = require('express');
const cors = require('cors');
const productsRoute = require('./routes/products');
const setupRoute = require('./routes/setup');
require('dotenv').config();

const app = express();
app.use(cors()); 
app.use(express.json());

app.use('/api/products', productsRoute);
app.use('/api/setup', setupRoute);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
