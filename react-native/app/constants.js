import {Platform} from 'react-native';
export const IP = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2';

// auth
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const LOGGED_IN = 'LOGGED_IN';

// restaurants
export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';