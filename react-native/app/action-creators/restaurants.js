import axios from 'axios';
import {
	RECEIVE_RESTAURANTS, CLEAR_RESTAURANTS, INCREMENT_SWIPE_COUNTER, SET_AVAILABLE, CLEAR_SWIPE_COUNTER, 
	ADD_TO_RESULTS, REMOVE_FROM_RESULTS, RECEIVE_RESTAURANT, RECEIVE_REVIEWS, ADDRESS
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

export const setAvailable = available => ({
	type: SET_AVAILABLE,
	available
});

export const addToResults = restaurant => ({
	type: ADD_TO_RESULTS,
	restaurant
});

export const removeFromResults = restaurant => ({
	type: REMOVE_FROM_RESULTS,
	restaurant
});

export const receiveRestaurant = restaurant => ({
	type: RECEIVE_RESTAURANT,
	restaurant
});

export const receiveReviews = reviews => ({
	type: RECEIVE_REVIEWS,
	reviews
});

export const getRestaurants = () =>
	(dispatch, getState) => {
		return new Promise((resolve, reject) => {
			axios.get(`${ADDRESS}/api/restaurants`,
				{
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
					let restaurants = body.businesses;
					if(!restaurants.length) dispatch(setAvailable(false));
					else dispatch(receiveRestaurants(restaurants.sort(() => 0.5 - Math.random())));
					resolve(restaurants);
				})
				.catch(error => {
					error.type = 'RESTAURANTS_ERROR';
					handleAuthenticationError(error, getRestaurants, reject)
				});
			});
		};

export const getRestaurant = (id) =>
	(dispatch, getState) => {
		return new Promise((resolve, reject) => {
			axios.get(`${ADDRESS}/api/restaurants/${id}`)
			.then(res => res.data)
			.then(restaurant => {
				dispatch(receiveRestaurant(restaurant));
				resolve(restaurant);
			})
			.catch(error => handleAuthenticationError(error, getRestaurant, reject));
			});
		}

export const getReviews = (id) =>
	(dispatch, getState) => {
		return new Promise((resolve, reject) => {
			axios.get(`${ADDRESS}/api/restaurants/${id}/reviews`)
			.then(res => res.data)
			.then(reviews => {
				dispatch(receiveReviews(reviews));
				resolve(reviews);
			})
			.catch(error => handleAuthenticationError(error, getReviews, reject));
			});
		}
