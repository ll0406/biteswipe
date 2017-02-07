import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	auth: require('./auth').default,
	filter: require('./filter').default,
	restaurants: require('./restaurants').default,
	ui: require('./ui').default
});

export default rootReducer;
