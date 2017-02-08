import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, undefined, compose(applyMiddleware(thunkMiddleware, createLogger()), autoRehydrate({log: true})));

export default store;