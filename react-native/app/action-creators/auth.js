import axios from 'axios';
import {REFRESH_TOKEN, ACCESS_TOKEN, LOGGED_IN, GETTING_ACCESS_TOKEN, IP} from '../constants';

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

export const getAccessToken = () => 
  (dispatch, getState) =>
    axios.get(`http://${IP}:1337/api/auth/token`, 
      {headers: {'Authorization': `Bearer ${getState().auth.refreshToken}`}})
      .then(res => res.data)
      .then(body => {
        dispatch(updateGettingAccessToken(false));
        dispatch(receiveAccessToken(body.accessToken));
      })
      .catch(console.err);

export const signup = (name, email, password) => 
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/signup`,
      {name, email, password})
      .then(res => res.data)
      .then(body => {
        dispatch(receiveRefreshToken(body.refreshToken));
        dispatch(receiveAccessToken(body.accessToken));
        dispatch(updateLoggedIn(true));
      })
      .catch(console.err);

export const login = (username, password) =>
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/local/login`,
      {username, password})
      .then(res => res.data)
      .then(body => {
        dispatch(receiveRefreshToken(body.refreshToken));
        dispatch(receiveAccessToken(body.accessToken));
        dispatch(updateLoggedIn(true));
      })
      .catch(console.err);

export const logout = () =>
  (dispatch, getState) =>
    axios.post(`http://${IP}:1337/api/auth/logout`, 
      {refreshToken: getState().auth.refreshToken})
      .then(() => {
        dispatch(receiveRefreshToken(''));
        dispatch(receiveAccessToken(''));
        dispatch(updateLoggedIn(false));
      })
      .catch(console.err);

