import {RECEIVE_LOCATION, RECEIVE_SETTINGS} from '../constants';

const initialState = {
	location: [],
  settings: {
    radius: 8050,
    priceRange: [1, 2, 3, 4],
    categories: [pizza, newamerican, italian, chinese, sushi, mexican, burgers, indpak]
  }
};

const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state);

	console.log(action);

	switch(action.type) {
		case RECEIVE_LOCATION:
			newState.location = action.location;
			break;
    case RECEIVE_SETTINGS:
      newState.settings = action.settings;
      break;
    default:
      return state
	};

	return newState;

};

export default reducer;
