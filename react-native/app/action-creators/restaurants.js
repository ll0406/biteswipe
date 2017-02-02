import {RECEIVE_RESTAURANTS} from '../constants';
import axios from 'axios';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});

export const getRestaurants = () => {
	return (dispatch, getState) => {
		axios.get('http://10.0.2.2:1337/api/restaurants', {
			params: {
			  latitude: getState.location.latitude,
			  longitude: getState.location.longitude,
			  radius: getState.settings.radius,
			  price: getState.settings.price.join(','),
			  categories: getState.settings.categories.join(',')
			}
		})
		.then(res => {
			return res.data
		})
		.then(restaurants => {
			dispatch(receiveRestaurants(restaurants));
		})
		.catch(console.error);
	};
};





