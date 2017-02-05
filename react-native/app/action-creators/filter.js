import axios from 'axios';
import {RECEIVE_LOCATION, RECEIVE_SETTINGS} from '../constants';

export const receiveLocation = location =>
({
  type: RECEIVE_LOCATION,
  location
});

export const receiveSearchSettings = settings =>
({
  type: RECEIVE_SETTINGS,
  settings
});

export const getCurrentLocation = () => {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        dispatch(receiveLocation(location));
        resolve();
      }, reject);
    });
	};
};

export const getSearchSettings = () => {
  return dispatch => {
    return axios.get('http://10.0.2.2:1337/api/searchSettings')
    .then(res => res.data)
    .then(settings => {
       dispatch(receiveSearchSettings(settings));
    })
    .catch(console.error);
  }
};

// TODO: post updated searchSettings from Filter.js updateFilterOption()