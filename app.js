const express = require('express');
const app = express();

const productRoutes = require('./Api/routes/product')
const orderRoutes = require('./Api/routes/order')

app.use('/product' , productRoutes);
app.use('/order' , orderRoutes);
	
module.exports = app; 