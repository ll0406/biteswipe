import {REFRESH_TOKEN, ACCESS_TOKEN, LOGGED_IN, GETTING_ACCESS_TOKEN, LOGIN_ERROR, SIGNUP_ERROR, AUTHENTICATED_USER} from '../constants';
import { REHYDRATE } from 'redux-persist/constants'; 

const initialState = {
	refreshToken: '',
	accessToken: '',
	loggedIn: false,
  gettingAccessToken: false,
  loginError: '',
  signupError: '',
  user: {}
};

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
    case LOGIN_ERROR:
      newState.loginError = action.loginError;
      break;
    case SIGNUP_ERROR:
      newState.signupError = action.signupError;
      break;
    case AUTHENTICATED_USER:
      newState.user = action.user;
      break;
    case REHYDRATE:
      const auth = action.payload.auth;
      if(auth) {
        newState = auth;
      }
      break;
  }
  return newState;
};

export default reducer; 