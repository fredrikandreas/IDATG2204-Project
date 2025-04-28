const express = require('express');
require('dotenv').config();

const app = express();
const productsRoute = require('./routes/products');
const setupRoute = require('./routes/setup');

console.log('Database Name:', process.env.DB_NAME);

app.use(express.json());

// Mount the products route
app.use('/api/products', productsRoute);
app.use('/api/setup', setupRoute);


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
