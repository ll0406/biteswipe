const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;


router.get('/', (req, res, next) => {
	
	.then(body => {
		console.log("yelp body: ", body);
		res.json(body); 
	})
	.catch(next);
});