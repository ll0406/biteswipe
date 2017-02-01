import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	auth: require('./auth').default,
	restaurants: require('./restaurants').default
});

export default rootReducer;