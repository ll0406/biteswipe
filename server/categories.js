const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;

const Categories = require('APP/db/models/category');

router.get('/', (req, res, next) => {
  Categories.findAll({})
	.then(restaurantCategories => {
		res.json(restaurantCategories);
	})
	.catch(next);
});

module.exports = router;
