import {RECEIVE_RESTAURANTS} from '../constants';
import axios from 'axios';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});

export const getRestaurants = () => {
	return dispatch => {
		axios.get('http://10.0.0.205:1337/api/restaurants')
		.then(res => res.data)
		.then(restaurants => {
			dispatch(receiveRestaurants(restaurants));
		})
		.catch(console.err);
	}
};