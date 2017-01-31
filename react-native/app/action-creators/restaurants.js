import {RECEIVE_RESTAURANTS} from '../constants';
import axios from 'axios';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});

export const getRestaurants = (latitude, longitude, radius, price, open_now, categories) => {
	return dispatch => {
		axios.get('http://192.168.115.79:1337/api/restaurants', {
			params: {	 
			  latitude,
			  longitude,
			  radius,
			  price, 
			  categories
			}
		})
		.then(res => res.data)
		.then(restaurants => {
			dispatch(receiveRestaurants(restaurants));
		})
		.catch(console.err);
	};
};





