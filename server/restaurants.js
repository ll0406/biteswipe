const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;
const querystring = require('querystring');
const {updateSecretsFile} = require('./utils');

let YELP_TOKEN = '';
let YELP_TOKEN_EXPIRATION_DATE = '';

const refreshYelpToken = (req, res, next, attempted) => {
	if(attempted) return next();
	axios.post('https://api.yelp.com/oauth2/token', querystring.stringify({
		grant_type: 'client_credentials',
		client_id: env.YELP_CLIENT_ID,
		client_secret: env.YELP_CLIENT_SECRET
	}), {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	.then(res => res.data)
	.then(body => {

		// update currently loaded tokens
		// store in memory (not secrets file)
		YELP_TOKEN = body.access_token;
		YELP_TOKEN_EXPIRATION_DATE = body.expiration;
		req.refreshedYelpToken = true;
		// run request again
		yelp(req, res, next);
	})
	.catch(next);
};

const yelp = (req, res, next) => {
	axios.get('https://api.yelp.com/v3/businesses/search?term=food&', {
		headers: { Authorization: `Bearer ${YELP_TOKEN}`},
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
		res.json(body);
	})
	.catch(error => {
		if(error.response.status === 401) refreshYelpToken(req, res, next, req.refreshedYelpToken || false);
		else {
			req.refreshedYelpToken = false;
			next(error);
		}
	});
};

router.get('/', yelp);

module.exports = router;
