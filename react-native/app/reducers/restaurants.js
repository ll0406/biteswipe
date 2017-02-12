import {
	RECEIVE_RESTAURANTS, CLEAR_RESTAURANTS, INCREMENT_SWIPE_COUNTER, SET_AVAILABLE, 
	CLEAR_SWIPE_COUNTER, ADD_TO_RESULTS, REMOVE_FROM_RESULTS, RECEIVE_RESTAURANT, RECEIVE_REVIEWS
} from '../constants';
import Immutable from 'immutable';
import {REHYDRATE} from 'redux-persist/constants';

const initialState = {
	list: Immutable.List([]),
	results: [],
	swipeCounter: 0,
	available: true
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch(action.type) {
		case RECEIVE_RESTAURANTS:
			newState.list = newState.list.concat(Immutable.List(action.restaurants));
			break;
		case CLEAR_RESTAURANTS:
			newState.list = Immutable.List([]);
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
    case RECEIVE_RESTAURANT:
      newState.restaurant = action.restaurant;
      break;
    case RECEIVE_REVIEWS:
      newState.reviews = action.reviews;
      break;
    case REHYDRATE:
    	if(action.payload.restaurants) {
    		newState = {...newState, ...action.payload.restaurants};
    		newState.list = Immutable.List(newState.list);
    	};
    	break;
    default:
      return state;
	};

	return newState;

};

export default reducer;
