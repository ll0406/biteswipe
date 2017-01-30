import axios from 'axios';
import {AUTHENTICATED, TOKEN, IP} from '../constants';
import {Actions} from 'react-native-router-flux';

export const authenticated = user => ({
  type: AUTHENTICATED, user
});

export const receiveToken = token => ({
  type: TOKEN, token
});

export const signup = (name, email, password) => 
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/signup`,
      {name, email, password})
      .then(res => res.data)
      .then((body) => {
        Actions.home();
        dispatch(receiveToken(body.token))
        dispatch(whoami())})
      .catch(() => dispatch(whoami()))

export const login = (username, password) =>
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/local/login`,
      {username, password})
      .then(res => res.data)
      .then((body) => {
        Actions.home();
        dispatch(receiveToken(body.token))
        dispatch(whoami())})
      .catch(() => dispatch(whoami()));

export const logout = () =>
  dispatch =>
    axios.post(`http://${IP}:1337/api/auth/logout`)
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const whoami = () =>
  dispatch =>
    axios.get(`http://${IP}:1337/api/auth/whoami`)
      .then(res => res.data)
      .then(user => dispatch(authenticated(user)))
      .catch(failed => dispatch(authenticated(null)));
