import {combineReducers} from 'redux';

const rootReducer = combineReducers({
	login: require('./login').default
});

export default rootReducer;