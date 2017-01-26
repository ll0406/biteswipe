import {RECEIVE_RESTAURANTS} from '../constants';
import axios from 'axios';

export const receiveRestaurants = restaurants => {
	type: RECEIVE_RESTAURANTS,
	restaurants
};

export const getRestaurants = () => {
	return dispatch => {
		axios.get('https://developers.zomato.com/api/v2.1/search?lat=38.989470&lon=-77.137011')
		.then(res => res.data)
		.then(body => {
			dispatch(receiveRestaurants(body.restaurants));
		})
		.catch(console.err);
	}
};