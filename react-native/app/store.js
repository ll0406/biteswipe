import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {autoRehydrate} from 'redux-persist';
import axios from 'axios';

const store = createStore(rootReducer, undefined, compose(applyMiddleware(createLogger(), thunkMiddleware), autoRehydrate()));

axios.interceptors.request.use(config => {
  const accessToken = store.getState().auth.accessToken;
  if(accessToken) config.headers['Authorization'] = 'Bearer ' + accessToken;
  return config;
}, error => console.log);

export default store;