import {RECEIVE_CATEGORIES, IP} from '../constants';
import axios from 'axios';

export const receiveCategories = categories => ({
	type: RECEIVE_CATEGORIES,
	categories
});


export const getCategories = () =>
	(dispatch) => {
		axios.get(`http://${IP}:1337/api/categories`)
			.then(res => res.data)
			.then(categories => {
				console.log("get Catagories File!: ", categories);
				dispatch(receiveCategories(categories));
			})
			.catch(console.error);
	}

