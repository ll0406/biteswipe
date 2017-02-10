const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;
const searchSettings = require('APP/db/models/searchSettings');

router.get('/', (req, res, next) => {
  searchSettings.find({
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
  console.log("searchSettings REQ BODY: ", req.body);
  searchSettings.update(req.body, { where: { user_id: req.user.id} })
  .then(() => {
		res.sendStatus(204);
	})
  .catch(next);
});

router.post('/', (req, res, next) => {
  searchSettings.findOrCreate({
    where: {user_id: req.user.id}
  })
  .then(settings => {
    res.json(settings);
  })
  .catch(next);
});

module.exports = router;
