import {REFRESH_TOKEN, ACCESS_TOKEN, LOGGED_IN, GETTING_ACCESS_TOKEN, AUTH_ERROR} from '../constants';

const initialState = {
	refreshToken: '',
	accessToken: '',
	loggedIn: false,
  gettingAccessToken: false,
  authError: ''
}

const reducer = (state=initialState, action) => {
	let newState = Object.assign({}, state);
  switch(action.type) {
  	case REFRESH_TOKEN:
  		newState.refreshToken = action.refreshToken;
  		break;
  	case ACCESS_TOKEN:
  		newState.accessToken = action.accessToken;
  		break;
  	case LOGGED_IN:
  		newState.loggedIn = action.loggedIn;
  		break;
    case GETTING_ACCESS_TOKEN:
      newState.gettingAccessToken = action.gettingAccessToken;
      break;
    case AUTH_ERROR:
      newState.authError = action.authError;
      break;
  }
  return newState;
};

export default reducer; 