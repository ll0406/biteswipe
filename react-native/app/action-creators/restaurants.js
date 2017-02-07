import {RECEIVE_RESTAURANTS, ADD_TO_RESULTS, REMOVE_FROM_RESULTS, IP} from '../constants';
import axios from 'axios';
import {handleAuthenticationError} from './auth';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});

export const addToResults = restaurant => ({
	type: ADD_TO_RESULTS,
	restaurant
});

export const removeFromResults = restaurant => ({
	type: REMOVE_FROM_RESULTS,
	restaurant
});

export const getRestaurants = () =>
	(dispatch, getState) => {
		axios.get(`http://${IP}:1337/api/restaurants`,
			{
				headers: {'Authorization': `Bearer ${getState().auth.accessToken}`},
				params: {
				  latitude: getState().filter.location.latitude || 37.422,
				  longitude: getState().filter.location.longitude || -122.084,
				  radius: getState().filter.settings.radius,
				  priceRange: getState().filter.settings.priceRange.join(','),
				  categories: getState().filter.settings.categories.join(',')
				}
			})
			.then(res => res.data)
			.then(body => {
				dispatch(receiveRestaurants(body.businesses));
			})
			.catch(error => handleAuthenticationError(error, getRestaurants));
		}
