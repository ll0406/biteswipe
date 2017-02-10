import {RECEIVE_CATEGORIES, ADDRESS} from '../constants';
import axios from 'axios';

export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
});


export const getCategories = () =>
	(dispatch, getState) => {
		axios.get(`${ADDRESS}/api/categories`, 
		 { headers: {'Authorization': `Bearer ${getState().auth.accessToken}`}})
			.then(res => res.data)
			.then(categories => {
				console.log("get Catagories File!: ", categories);
				dispatch(receiveCategories(categories));
			})
			.catch(console.error);
	}

