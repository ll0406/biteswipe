import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import authMiddleware from './middleware/auth';
import thunkMiddleware from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(createLogger(), authMiddleware, thunkMiddleware));

export default store;