import {RECEIVE_RESTAURANTS, RECEIVE_RESTAURANT, IP} from '../constants';
import axios from 'axios';
import {handleAuthenticationError} from './auth';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});

export const receiveRestaurant = restaurant => ({
	type: RECEIVE_RESTAURANT,
	restaurant
});

export const getRestaurants = () =>
	(dispatch, getState) => {
		axios.get(`http://${IP}:1337/api/restaurants`,
			{
				headers: {'Authorization': `Bearer ${getState().auth.accessToken}`},
				params: {
				  latitude: getState().filter.location.latitude,
				  longitude: getState().filter.location.longitude,
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

export const getRestaurant = () =>
	(dispatch, getState) => {
		console.log('in getRestaurant')
		axios.get(`http://${IP}:1337/api/restaurants/restaurant`)
			.then(res => res.data)
			.then(restaurant => {
				dispatch(receiveRestaurant(restaurant));
			})
			.catch(error => handleAuthenticationError(error, getRestaurant));
		}
