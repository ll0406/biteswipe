import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	login: require('./login').default,
	restaurants: require('./restaurants').default
});

export default rootReducer;