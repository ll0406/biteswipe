import {RECEIVE_LOCATION, RECEIVE_SETTINGS, ADD_CATEGORY, REMOVE_CATEGORY} from '../constants';

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
    case ADD_CATEGORY:
      let addIndex = state.settings.categories.indexOf(action.categoryToAdd);
      
      console.log("adding Index: ", addIndex);

      if(addIndex === -1) {
        let categories = state.settings.categories.slice();
       
        categories.push(action.categoryToAdd);

        newState.settings.categories = categories;
      }
      break;
    case REMOVE_CATEGORY:
      let removalIndex = state.settings.categories.indexOf(action.categoryToRemove);
      console.log("removal Index: ", removalIndex);
      if(removalIndex !== -1) state.settings.categories.splice(removalIndex, 1);
      
      newState.settings.categories = state.settings.categories;
      
      break;
    default:
      return state
	};

	return newState;

};

export default reducer;
