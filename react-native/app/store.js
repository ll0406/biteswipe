import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import {whoami} from './action-creators/login';
import {getRestaurants} from './action-creators/restaurants';
import {getCurrentLocation} from './action-creators/filter';

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware));

export default store;

// TODO: getRestaurants on app load
// Need user settings to pass in
// And need getCurrentLocation()
// store.dispatch(getRestaurants());
