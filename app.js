const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require("mongoose");



const productRoutes = require('./Api/routes/product')
const orderRoutes = require('./Api/routes/order')

//connecting to mongodb
mongoose.connect('mongodb+srv://Kritika21:' + process.env.MONGO_ATLAS_PW + '@cluster0-x5ftg.mongodb.net/<dbname>?retryWrites=true&w=majority',
	{ useUnifiedTopology: true
		,useNewUrlParser: true  }
);

mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//CORS handling
app.use((req,res,next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin','X-Requested-With','Content-Type','Accept','Authorization');
if(req.method === 'OPTIONS'){
	res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
	return res.status(200).json({});
}
next();
 });

 //Routes which should handle requests
app.use('/product' , productRoutes);
app.use('/order' , orderRoutes);

//handle every request /error if some wrong path is accessed
app.use((req,res,next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
})

//Handle error when we have database and some operations can fail
app.use((error,req,res,next) => {
res.status(error.status || 500);
res.json({
	error: {
		message: error.message
	}
});
});
	
module.exports = app; 