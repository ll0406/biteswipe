import {RECEIVE_RESTAURANTS, IP} from '../constants';
import axios from 'axios';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});

export const getRestaurants = () =>
	(dispatch, getState) => {
		console.log("tell us the FUCKING getState(): ", getState());
		axios.get(`http://${IP}:1337/api/restaurants`,
			{headers: {'Authorization': `Bearer ${getState().auth.accessToken}`},
			params: {
			  latitude: getState().filter.location.latitude,
			  longitude: getState().filter.location.longitude,
			  radius: getState().filter.settings.radius,
			  priceRange: getState().filter.settings.priceRange.join(','),
			  categories: getState().filter.settings.categories.join(',')
			}})
			.then(res => res.data)
			.then(restaurants => {
				dispatch(receiveRestaurants(restaurants));
			})
			.catch(console.error);
	}
	
