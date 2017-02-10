import {RECEIVE_LOCATION, RECEIVE_SETTINGS, SET_CATEGORIES} from '../constants';

const initialState = {
	location: null,
	settings: {
	  radius: 8050,
	  priceRange: [1, 2, 3, 4],
	  categories: ['pizza', 'newamerican', 'italian', 'chinese', 'sushi', 'mexican', 'burgers', 'indpak']
	}
	// should default on backend -> set to null here initially
  // settings: null
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
      newState.categories = action.categories;
      break;
    default:
      return state
	};

	return newState;

};

export default reducer;
