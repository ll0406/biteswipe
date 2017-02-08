import axios from 'axios';
import {
	RECEIVE_RESTAURANTS, CLEAR_RESTAURANTS, INCREMENT_SWIPE_COUNTER, 
	SET_AVAILABLE, CLEAR_SWIPE_COUNTER, ADD_TO_RESULTS, REMOVE_FROM_RESULTS, ADDRESS
} from '../constants';
import {RESTAURANTS_ERROR} from '../errors';
import {handleAuthenticationError} from './auth';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});

export const clearRestaurants = restaurant => ({
	type: CLEAR_RESTAURANTS
});

export const incrementSwipeCounter = () => ({
	type: INCREMENT_SWIPE_COUNTER
});

export const clearSwipeCounter = () => ({
	type: CLEAR_SWIPE_COUNTER
});

export const setAvailable = () => ({
	type: SET_AVAILABLE
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
		return new Promise((resolve, reject) => {
			axios.get(`${ADDRESS}/api/restaurants`,
				{
					headers: {'Authorization': `Bearer ${getState().auth.accessToken}`},
					params: {
					  latitude: getState().filter.location.latitude,
					  longitude: getState().filter.location.longitude,
					  radius: getState().filter.settings.radius,
					  priceRange: getState().filter.settings.priceRange.join(','),
					  categories: getState().filter.settings.categories.join(','),
					  offset: getState().restaurants.list.length
					}
				})
				.then(res => res.data)
				.then(body => {
					if(!body.businesses.length) dispatch(setAvailable(false));
					else dispatch(receiveRestaurants(body.businesses.sort(() => 0.5 - Math.random())));
					resolve();
				})
				.catch(error => {
					error.type = 'RESTAURANTS_ERROR';
					handleAuthenticationError(error, getRestaurants, reject)
				});
		});
	};
