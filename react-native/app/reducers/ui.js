import {SET_CURRENT_TAB} from '../constants';

const initialState = {
	tab: 0
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);
	switch(action.type) {
		case SET_CURRENT_TAB:
			newState.tab = action.tab;
			break;
	};
	return newState;
};

export default reducer; 
