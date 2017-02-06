import {RECEIVE_RESTAURANTS, RECEIVE_RESTAURANT} from '../constants';

import dummyData from './dummyData';

const initialState = {
	list: dummyData,
  restaurant: {}
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch(action.type) {
		case RECEIVE_RESTAURANTS:
			newState.list = action.restaurants;
			break;
    case RECEIVE_RESTAURANT:
      newState.restaurant = action.restaurant;
      break;
    default:
      return state;
	};

	return newState;

};

export default reducer;
