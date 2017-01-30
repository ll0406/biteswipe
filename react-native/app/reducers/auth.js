import {AUTHENTICATED, TOKEN} from '../constants';

const initialState = {
	user: null,
	token: ''
}

const reducer = (state=initialState, action) => {
	let newState = Object.assign({}, state);
  switch(action.type) {
  	case AUTHENTICATED:
  		newState.user = action.user;
  		break;
  }
  return newState;
};

export default reducer; 