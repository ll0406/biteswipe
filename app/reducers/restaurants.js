import {RECEIVE_RESTAURANTS} from '../constants';

initialState = {
	list: []
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);

	switch(action.type) {
		case RECEIVE_RESTAURANTS:
			newState.list = action.restaurants;
			break;
	};

	return newState;

};