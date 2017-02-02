import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {getRestaurants} from './action-creators/restaurants';
import {getCurrentLocation, getSearchSettings} from './action-creators/filter';

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware));

export default store;

// TODO: getRestaurants on app load
// Need user settings to pass in
// And need getCurrentLocation()

// Need to make this into a Promise chain
// so it fires in the correct order

// store.dispatch(getCurrentLocation());
// store.dispatch(getSearchSettings());
// store.dispatch(getRestaurants());

