import {RECEIVE_CATEGORIES} from '../constants';

const initialState = {
	list: null,
	map: null
};

const reducer = (state = initialState, action) => {
	const newState = Object.assign({}, state);
	switch(action.type) {
		case RECEIVE_CATEGORIES:
			newState.list = action.categories;
			let map = {};
			action.categories.forEach(category => map[category.alias] = category.title);
			newState.map = map;
			break;
    default:
    	return state;
	};
	return newState;
};

export default reducer; 
