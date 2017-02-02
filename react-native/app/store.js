import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {persistStore} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware));
persistStore(store, {storage: AsyncStorage});

export default store;