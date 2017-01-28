import axios from 'axios';
import {AUTHENTICATED} from '../constants';

export const authenticated = user => ({
  type: AUTHENTICATED, user
});

export const login = (username, password) =>
  dispatch =>
    axios.post('http://192.168.1.155:1337/api/auth/local/login',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const logout = () =>
  dispatch =>
    axios.post('http://192.168.1.155:1337/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const whoami = () =>
  dispatch =>
    axios.get('http://192.168.1.155:1337/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)));
