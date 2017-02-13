import {
	RECEIVE_LOCATION, RECEIVE_SETTINGS, SET_CATEGORIES, SET_TEMPORARY_CATEGORIES, 
	SET_TEMPORARY_RADIUS, SET_TEMPORARY_PRICE_RANGE
} from '../constants';

const initialState = {
	location: null,
	settings: null,
	temporaryCategories: null,
	temporaryRadius: null,
	temporaryPriceRange: null
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
      case SET_TEMPORARY_CATEGORIES:
        newState.temporaryCategories = action.temporaryCategories;
        break;
      case SET_TEMPORARY_RADIUS:
        newState.temporaryRadius = action.temporaryRadius;
        break;
      case SET_TEMPORARY_PRICE_RANGE:
        newState.temporaryPriceRange = action.temporaryPriceRange;
        break;
	    default:
	      return state
	};

	return newState;

};

export default reducer;
