import {
	RECEIVE_RESTAURANTS, CLEAR_RESTAURANTS, INCREMENT_SWIPE_COUNTER, SET_AVAILABLE, CLEAR_SWIPE_COUNTER, 
	ADD_TO_RESULTS, REMOVE_FROM_RESULTS, CLEAR_RESULTS, RECEIVE_RESTAURANT, RECEIVE_REVIEWS
} from '../constants';

const initialState = {
	list: [],
	results: {},
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
			let addedResults = Object.assign({}, newState.results);
			addedResults[action.restaurant.id] = action.restaurant;
			newState.results = addedResults;
			break;
		case REMOVE_FROM_RESULTS:
			let deletedResults = Object.assign({}, newState.results);
			delete deletedResults[action.restaurant.id];
			newState.results = deletedResults;
			break;
		case CLEAR_RESULTS:
			newState.results = [];
			break;
    case RECEIVE_RESTAURANT:
      newState.restaurant = action.restaurant;
      break;
    case RECEIVE_REVIEWS:
      newState.reviews = action.reviews;
      break;
    default:
      return state;
	};

	return newState;

};

export default reducer;
