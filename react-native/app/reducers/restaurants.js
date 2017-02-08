import {
	RECEIVE_RESTAURANTS, CLEAR_RESTAURANTS, INCREMENT_SWIPE_COUNTER, SET_AVAILABLE, 
	CLEAR_SWIPE_COUNTER, ADD_TO_RESULTS, REMOVE_FROM_RESULTS
} from '../constants';

import dummyData from './dummyData';

const initialState = {
	list: [],
	results: [],
	swipeCounter: 0,
	available: true
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch(action.type) {
		case RECEIVE_RESTAURANTS:
			newState.list = newState.list.concat(action.restaurants);
			break;
		case CLEAR_RESTAURANTS:
			newState.list = [];
			break;
		case INCREMENT_SWIPE_COUNTER:
			newState.swipeCounter = newState.swipeCounter + 1;
			break;
		case SET_AVAILABLE:
			newState.available = action.available;
			break;
		case CLEAR_SWIPE_COUNTER:
			newState.swipeCounter = 0;
			break;
		case ADD_TO_RESULTS:
			newState.results = [...newState.results, action.restaurant];
			break;
		case REMOVE_FROM_RESULTS:
			newState.results = newState.results.filter(restaurant => restaurant.id !== action.restaurant.id);
			break;
		default:
			return state;
	};

	return newState;

};

export default reducer; 
