import {Platform} from 'react-native';
export const IP = Platform.OS === 'ios' ? '127.0.0.1' : '10.0.2.2';

// auth
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const LOGGED_IN = 'LOGGED_IN';
export const GETTING_ACCESS_TOKEN = 'GETTING_ACCESS_TOKEN';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

// restaurants
export const RECEIVE_RESTAURANTS = 'RECEIVE_RESTAURANTS';

// restaurants
export const RECEIVE_RESTAURANT = 'RECEIVE_RESTAURANT';

//in filter settings, we will need to determine the user's location
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';

export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS';
