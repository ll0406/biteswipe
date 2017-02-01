const router = require('express').Router();
const axios = require('axios');
const env = require('APP').env;
const querystring = require('querystring');
const {updateSecretsFile} = require('./utils');

router.use((req, res, next) => refreshYelpToken(next));

const refreshYelpToken = (next) => {
	const body = {
		grant_type: 'client_credentials',
		client_id: env.YELP_CLIENT_ID,
		client_secret: env.YELP_CLIENT_SECRET
	};
	console.log(body);
	axios.post('https://api.yelp.com/oauth2/token', querystring.stringify(body), {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
	.then(res => res.data)
	.then(body => {
		console.log(body);
		const keys = ['YELP_TOKEN', 'YELP_TOKEN_EXPIRATION_DATE'];
		const values = [body.access_token, body.expires_in];
		updateSecretsFile(keys, values);
		next();
	})
	.catch(next);
};

// router.get('/', (req, res, next) => {
// 	axios.get('https://api.yelp.com/v3/businesses/search?term=food&', {
// 		headers: { Authorization: `Bearer ${env.YELP_TOKEN}`},
// 		params: { 			  
// 			latitude: req.query.latitude,
// 			longitude: req.query.longitude,
// 			radius: req.query.radius,
// 			price: req.query.price, 
// 			categories: req.query.categories,
// 			open_now: true
// 		}
// 	})
// 	.then(res => res.data)
// 	.then(body => {
// 		res.json(body); 
// 	})
// 	.catch(next);
// });

module.exports = router;
