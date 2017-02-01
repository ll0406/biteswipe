const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;

const searchSettings = require('APP/db/models/searchSettings')

router.get('/', (req, res, next) => {
  searchSettings.find({
    where: {
      user_id: req.user.id
    }
  })
	.then(settings => {
		console.log("current user", settings);
		res.json(settings);
	})
	.catch(next);
});

module.exports = router;
