import {RECEIVE_RESTAURANTS, IP} from '../constants';
import axios from 'axios';

export const receiveRestaurants = restaurants => ({
	type: RECEIVE_RESTAURANTS,
	restaurants
});


export const getRestaurants = () => 
	(dispatch, getState) => 
		axios.get(`http://${IP}:1337/api/restaurants`,
			{headers: {'Authorization': `Bearer ${getState().auth.accessToken}`}})
			.then(res => res.data)
			.then(restaurants => {
				dispatch(receiveRestaurants(restaurants));
			})
			.catch(console.error);