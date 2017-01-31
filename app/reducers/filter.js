import {RECEIVE_LOCATION} from '../constants';

const initialState = {
	location: []
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);

	switch(action.type) {
		case RECEIVE_LOCATION:
			newState.location = action.location;
			break;
	};

	return newState;

};

export default reducer; 