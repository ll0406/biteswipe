import axios from 'axios';
import {LOCATION_ERROR, SEARCH_SETTINGS_ERROR} from '../errors';
import {handleAuthenticationError} from './auth';
import {RECEIVE_LOCATION, RECEIVE_SETTINGS, ADD_CATEGORY, REMOVE_CATEGORY, ADDRESS} from '../constants';

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


export const addCategory = categoryToAdd => ({
  type: ADD_CATEGORY,
  categoryToAdd
});

export const removeCategory = categoryToRemove => ({
  type: REMOVE_CATEGORY,
  categoryToRemove
});

export const getCurrentLocation = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          dispatch(receiveLocation(location));
          resolve();
      }, 
        error => {
          error.type = LOCATION_ERROR;
          reject(error)
      });
    });
	};
};

export const getSearchSettings = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.get(`${ADDRESS}/api/searchSettings`)
        .then(res => res.data)
        .then(settings => {
           dispatch(receiveSearchSettings(settings));
           resolve();
        })
        .catch(error => {
          error.type = SEARCH_SETTINGS_ERROR;
          handleAuthenticationError(error, getSearchSettings, reject)
        }); 
    });
  };
};

// TODO: post updated searchSettings from Filter.js updateFilterOption()
export const addSearchSettings = (priceRange, radius, categories) => {
  return dispatch => {
    return axios.put('http://10.0.2.2:1337/api/searchSettings', { priceRange: priceRange, radius: radius, categories: categories })
    .then(res => res.data)
    .catch(console.error);
  }
}; 