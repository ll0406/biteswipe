import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware));
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;