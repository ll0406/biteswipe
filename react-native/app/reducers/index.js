import {combineReducers} from 'redux';
import {LOGGED_IN, CLEAR_STORE} from '../constants';
import {persistStore} from 'redux-persist';
import store from '../store';

const appReducer = combineReducers({
	auth: require('./auth').default,
	filter: require('./filter').default,
	restaurants: require('./restaurants').default,
	ui: require('./ui').default,
	categories: require('./categories').default
});

// clear global state after logout
const rootReducer = (state, action) => {
	switch(action.type) {
		case LOGGED_IN:
			if(!action.loggedIn) {
				// stagger clearing of store
				setTimeout(() => {
					store.dispatch({
						type: CLEAR_STORE
					});
				}, 250);
			};
			break;
		case CLEAR_STORE:
			state = undefined
			break;
	}
	return appReducer(state, action);
};

export default rootReducer;
