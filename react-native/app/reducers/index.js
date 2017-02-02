import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	filter: require('./filter').default,
	auth: require('./auth').default,
	restaurants: require('./restaurants').default
});

export default rootReducer;
