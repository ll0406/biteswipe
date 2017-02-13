const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;
const SearchSettings = require('APP/db/models/searchSettings');

router.get('/', (req, res, next) => {
  SearchSettings.find({
    where: {
      user_id: req.user.id
    }
  })
	.then(settings => {
		res.json(settings);
	})
	.catch(next);
});

router.put('/', (req, res, next) => {
  SearchSettings.update(req.body, { where: { user_id: req.user.id} })
  .then(() => {
		res.sendStatus(204);
	})
  .catch(next);
});

router.post('/', (req, res, next) => {
  SearchSettings.findOrCreate({
    where: {user_id: req.user.id}
  })
  .then(settings => {
    res.json(settings);
  })
  .catch(next);
});

module.exports = router;
