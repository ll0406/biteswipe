import {Platform} from 'react-native';
export const IP = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2';

// auth
export const AUTHENTICATED = 'AUTHENTICATED';
export const TOKEN = 'TOKEN';

// restaurants
export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';