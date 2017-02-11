import {RECEIVE_LOCATION, RECEIVE_SETTINGS, SET_CATEGORIES} from '../constants';

const initialState = {
	location: null,
	settings: null
};

const reducer = (state = initialState, action) => {
	
  let newState = Object.assign({}, state);


	switch(action.type) {
		case RECEIVE_LOCATION:
			newState.location = action.location;
			break;
	    case RECEIVE_SETTINGS:
	      newState.settings = action.settings;
	      break;
	    case SET_CATEGORIES:
	      newState.settings.categories = action.categories;
	      break;
	    default:
	      return state
	};

	return newState;

};

export default reducer;
