import {combineReducers} from 'redux';
import {LOGGED_IN} from '../constants';
import {persistStore} from 'redux-persist';
import store from '../store';

const appReducer = combineReducers({
	auth: require('./auth').default,
	filter: require('./filter').default,
	restaurants: require('./restaurants').default,
	ui: require('./ui').default
});

// clear global state after logout
const rootReducer = (state, action) => {
	if(action.type === LOGGED_IN && !action.loggedIn) {
		state = undefined;
	};
	return appReducer(state, action);
};

export default rootReducer;
