const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;

var config = {
  headers: {'user-key': env.ZOMATO_API_KEY}
};

router.get('/', (req, res, next) => {
	axios.get('https://developers.zomato.com/api/v2.1/search?lat=38.989470&lon=-77.137011', config)
	.then(res => res.data)
	.then(body => {
		const restaurants = body.restaurants.map(obj => obj.restaurant);
		res.json(restaurants);
	})
	.catch(next);
});

module.exports = router;