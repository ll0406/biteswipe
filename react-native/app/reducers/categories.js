import {RECEIVE_CATEGORIES} from '../constants';

const initialState = {
	catList: []
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch(action.type) {
		case RECEIVE_CATEGORIES:
			newState.catList = action.categories;
			break;
	    default:
	    	return state;
	};

	return newState;

};

export default reducer; 
