import {RECEIVE_RESTAURANTS, ADD_TO_RESULTS, REMOVE_FROM_RESULTS} from '../constants';

import dummyData from './dummyData';

const initialState = {
	list: [],
	results: []
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch(action.type) {
		case RECEIVE_RESTAURANTS:
			newState.list = action.restaurants;
			break;
		case ADD_TO_RESULTS:
			newState.results = [...newState.results, action.restaurant];
			break;
		case REMOVE_FROM_RESULTS:
			newState.results = newState.results.filter(result => result.id !== action.restaurant.id)
			break;
	};

	return newState;

};

export default reducer; 
