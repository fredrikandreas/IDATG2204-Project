const express = require('express');
const cors = require('cors');
const productsRoute = require('./routes/products');
const setupRoute = require('./routes/setup');
const orderRoute = require('./routes/order');
const brandRoute = require('./routes/brand');
const categoryRoute = require('./routes/category');
require('dotenv').config();
const path = require("path");

const app = express();
const authRoutes = require("./routes/auth");

app.use(cors()); 
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api", authRoutes);
app.use('/api/products', productsRoute);
app.use('/api/setup', setupRoute);
app.use('/api/order', orderRoute);
app.use('/api/brand', brandRoute);
app.use('/api/category', categoryRoute);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
