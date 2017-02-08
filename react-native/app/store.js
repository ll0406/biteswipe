import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {autoRehydrate} from 'redux-persist';

const store = createStore(rootReducer, undefined, compose(applyMiddleware(createLogger(), thunkMiddleware), autoRehydrate({log: true})));

export default store;