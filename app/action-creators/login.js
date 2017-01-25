import axios from 'axios';
import {AUTHENTICATED} from '../constants.jsx';

export const authenticated = user => ({
  type: AUTHENTICATED, user
});

export const login = (username, password, strategy) =>
  dispatch =>
    axios.post(`/api/auth/${strategy}`,
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null)));
