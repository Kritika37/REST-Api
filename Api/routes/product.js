const express = require('express');
const router = express.Router();

router.get('/' ,(req, res, next) =>{
	res.status(200).json({
		message: 'handle incoming get request to /product'
	});
});  //handle incoming get request

router.post('/' ,(req, res, next) =>{
	res.status(201).json({
		message: 'handle incoming POST request to /product'
	});
});  

//routes having id 

router.get('/:productid',(req,res,next) =>{
	const id = req.params.productid;
	if(id == 'special'){
		res.status(200).json({
			message: 'special id found',
			id: id
		});
	}
	else{
		res.status(200).json({
			message: 'you passed an id'
		});
	}
});

router.patch('/:productid',(req,res,next) =>{
	
		res.status(200).json({
			message: 'updated product'
		});
});

router.delete('/:productid',(req,res,next) =>{
	
		res.status(200).json({
			message: 'Deleted product'
		});
});

module.exports = router;