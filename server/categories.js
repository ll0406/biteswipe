const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;

const categories = require('../db/models/categories')

router.get('/', (req, res, next) => {
  categories.findAll({})
	.then(restaurantCategories => {
		res.json(restaurantCategories);
	})
	.catch(next);
});


module.exports = router;
