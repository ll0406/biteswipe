import axios from 'axios';
import {REFRESH_TOKEN, ACCESS_TOKEN, LOGGED_IN, IP} from '../constants';

export const receiveRefreshToken = refreshToken => ({
  type: REFRESH_TOKEN, refreshToken
});

export const receiveAccessToken = accessToken => ({
  type: ACCESS_TOKEN, accessToken
});

export const updateLoggedIn = loggedIn => ({
  type: LOGGED_IN, loggedIn
});

export const getAccessToken = (token) => 
  dispatch =>
    axios.get(`http://${IP}:1337/api/auth/token`, {
      header: {

      }
    });


export const signup = (name, email, password) => 
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/signup`,
      {name, email, password})
      .then(res => res.data)
      .then((body) => {
        dispatch(receiveRefreshToken(body.refreshToken));
        dispatch(receiveAccessToken(body.accessToken));
        dispatch(updateLoggedIn(true));
      });

export const login = (username, password) =>
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/local/login`,
      {username, password})
      .then(res => res.data)
      .then((body) => {
        dispatch(receiveRefreshToken(body.refreshToken));
        dispatch(receiveAccessToken(body.accessToken));
        dispatch(updateLoggedIn(true));
      });

export const logout = () =>
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/logout`)
      .then(() => dispatch(whoami()));
