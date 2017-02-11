import {RECEIVE_CATEGORIES} from '../constants';

const reducer = (state = [], action) => {
	switch(action.type) {
		case RECEIVE_CATEGORIES:
			return action.categories;
    default:
    	return state;
	};
};

export default reducer; 
