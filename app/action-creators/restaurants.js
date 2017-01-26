import {RECEIVE_RESTAURANTS} from '../constants';
import axios from 'axios';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});


export const getRestaurants = () => {
	return dispatch => {
		axios.get('/api/restaurants')
		.then(res => res.data)
		.then(body => {
			dispatch(receiveRestaurants(body.restaurants));
		})
		.catch(console.err);
	}
};