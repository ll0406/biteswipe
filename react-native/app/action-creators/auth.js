import axios from 'axios';
import {REFRESH_TOKEN, ACCESS_TOKEN, LOGGED_IN, GETTING_ACCESS_TOKEN, AUTH_ERROR, IP} from '../constants';
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

export const updateAuthError = authError => ({
  type: AUTH_ERROR, authError
});

export const handleAuthenticationError = (error, func) => {
  if (error.response.status === 401) store.dispatch(getAccessToken(func));
  else console.error(error);
};

export const getAccessToken = (func) => 
  (dispatch, getState) =>
    axios.get(`http://${IP}:1337/api/auth/token`, 
      {headers: {'Authorization': `Bearer ${getState().auth.refreshToken}`}})
      .then(res => res.data)
      .then(body => {
        dispatch(updateGettingAccessToken(false));
        dispatch(receiveAccessToken(body.accessToken));
        // try async thunk again
        if(func) dispatch(func());
      })
      .catch(error => {
        if(error.response.status === 401) dispatch(logout);
        else console.error(error);
      });

export const signup = (name, email, password) => 
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/signup`,
      {name, email, password})
      .then(res => res.data)
      .then(body => {
        dispatch(receiveRefreshToken(body.refreshToken));
        dispatch(receiveAccessToken(body.accessToken));
        dispatch(updateLoggedIn(true));
        dispatch(updateAuthError(''));
      })
      .catch(console.error);

export const login = (username, password) =>
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/local/login`,
      {username, password})
      .then(res => res.data)
      .then(body => {
        dispatch(receiveRefreshToken(body.refreshToken));
        dispatch(receiveAccessToken(body.accessToken));
        dispatch(updateLoggedIn(true));
        dispatch(updateAuthError(''));
      })
      .catch(error => {
        dispatch(updateAuthError('Invalid email/password'));
      });

export const logout = () =>
  (dispatch, getState) =>
    axios.post(`http://${IP}:1337/api/auth/logout`, 
      {refreshToken: getState().auth.refreshToken})
      .then(() => {
        dispatch(receiveRefreshToken(''));
        dispatch(receiveAccessToken(''));
        dispatch(updateLoggedIn(false));
        dispatch(updateAuthError(''));
      })
      .catch(console.error);

