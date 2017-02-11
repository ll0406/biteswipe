import {RECEIVE_CATEGORIES, ADDRESS} from '../constants';
import axios from 'axios';
import {handleAuthenticationError} from './auth';

export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
});

export const getCategories = () =>
	(dispatch, getState) => {
		return new Promise((resolve, reject) => {
			axios.get(`${ADDRESS}/api/categories`, 
			 { headers: {'Authorization': `Bearer ${getState().auth.accessToken}`}})
				.then(res => res.data)
				.then(categories => {
					dispatch(receiveCategories(categories));
					resolve();
				})
				.catch(error => handleAuthenticationError(error, getCategories, reject));
		});
	}
