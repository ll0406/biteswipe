import axios from 'axios';
import {
  REFRESH_TOKEN, ACCESS_TOKEN, LOGGED_IN, GETTING_ACCESS_TOKEN, 
  LOGIN_ERROR, SIGNUP_ERROR, AUTHENTICATED_USER, ADDRESS
} from '../constants';
import {AUTH_USER_ERROR} from '../errors';
import {persistStore} from 'redux-persist'
import store from '../store'

export const receiveRefreshToken = refreshToken => ({
  type: REFRESH_TOKEN, refreshToken
});

export const receiveAccessToken = accessToken => ({
  type: ACCESS_TOKEN, accessToken
});

export const updateLoggedIn = loggedIn => ({
  type: LOGGED_IN, loggedIn
});

export const updateGettingAccessToken = gettingAccessToken => ({
  type: GETTING_ACCESS_TOKEN, gettingAccessToken
});

export const updateLoginError = loginError => ({
  type: LOGIN_ERROR, loginError
});

export const updateSignupError = signupError => ({
  type: SIGNUP_ERROR, signupError
});

export const receiveAuthenticatedUser = user => ({
  type: AUTHENTICATED_USER, user
})

// can be utilized by any action-creators that hit protected routes
export const handleAuthenticationError = (error, func, resolve, reject) => {
  if (error.response && error.response.status === 401) store.dispatch(getAccessToken(func, resolve, reject));
  else {
    console.log(error);
    if(reject) reject(error);
  };
};

export const getAccessToken = (func, resolve, reject) => 
  (dispatch, getState) =>
    axios.post(`${ADDRESS}/api/auth/token`, 
      { refreshToken: getState().auth.refreshToken })
      .then(res => res.data)
      .then(body => {
        dispatch(updateGettingAccessToken(false));
        dispatch(receiveAccessToken(body.accessToken));
        // try async thunk again
        if(func) {
          // since func() should be a promise we reject/resolve
          // when that promise finishes (crazy inception of promises)
          dispatch(func())
          .then(resolve)
          .catch(reject)
        };
      })
      .catch(error => {
        if(error.response && error.response.status === 401) dispatch(logout);
        else console.log(error);
        // if passed in from promise, eventually reject
        if(reject) reject(error);
      });

export const getAuthenticatedUser = () => 
  (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.post(`${ADDRESS}/api/auth/user`, 
        { refreshToken: getState().auth.refreshToken })
        .then(res => res.data)
        .then(body => {
          dispatch(receiveAuthenticatedUser(body.user));
          resolve();
        })
        .catch(error => {
          if(error.response && error.response.status === 401) dispatch(logout);
          else console.log(error);
          error.type = AUTH_USER_ERROR;
          reject(error);
        });
    });
  };
      
export const signup = (name, email, password) => 
  dispatch =>
    axios.post(`${ADDRESS}/api/auth/signup`,
      {name, email, password})
      .then(res => res.data)
      .then(body => {
        dispatch(receiveRefreshToken(body.refreshToken));
        dispatch(receiveAccessToken(body.accessToken));
        dispatch(updateLoggedIn(true));
        dispatch(updateLoginError(''));
        dispatch(updateSignupError(''));
      })
      .catch(error => {
        console.log(error);
        dispatch(updateSignupError('Email has already been used'));
      });

export const login = (username, password) =>
  dispatch =>
    axios.post(`${ADDRESS}/api/auth/local/login`,
      {username, password})
      .then(res => res.data)
      .then(body => {
        dispatch(receiveRefreshToken(body.refreshToken));
        dispatch(receiveAccessToken(body.accessToken));
        dispatch(updateLoggedIn(true));
        dispatch(updateLoginError(''));
        dispatch(updateSignupError(''));
      })
      .catch(error => {
        console.log(error);
        dispatch(updateLoginError('Invalid email/password'));
      });

export const logout = () =>
  dispatch => {
    dispatch(receiveRefreshToken(''));
    dispatch(receiveAccessToken(''));
    dispatch(updateLoggedIn(false));
  };
