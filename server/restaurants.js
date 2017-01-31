const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;

router.get('/', (req, res, next) => {

	axios.get('https://api.yelp.com/v3/businesses/search?term=food&', {
		headers: { Authorization: `Bearer ${env.YELP_TOKEN}`},
		params: { 			  
			latitude: req.query.latitude,
			longitude: req.query.longitude,
			radius: req.query.radius,
			price: req.query.price, 
			categories: req.query.categories,
			open_now: true
	    }
	})
	.then(res => res.data)
	.then(body => {
		console.log("restaurants, maybe?? ", body);
		res.json(body); 
	})
	.catch(next);
});



module.exports = router;
