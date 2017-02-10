import axios from 'axios';
import {LOCATION_ERROR, SEARCH_SETTINGS_ERROR} from '../errors';
import {handleAuthenticationError} from './auth';
import {RECEIVE_LOCATION, RECEIVE_SETTINGS, SET_CATEGORIES, ADDRESS} from '../constants';

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

export const setCategories = categories => 
({
  type: SET_CATEGORIES,
  categories
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
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${ADDRESS}/api/searchSettings`, 
        { headers: {'Authorization': `Bearer ${getState().auth.accessToken}`}})
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

export const addSearchSettings = (priceRange, radius) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      const settings = { priceRange: priceRange, radius: radius, categories: getState().filter.settings.categories };
      dispatch(receiveSearchSettings(settings));
      axios.put(`${ADDRESS}/api/searchSettings`, settings,
        { headers: {'Authorization': `Bearer ${getState().auth.accessToken}`}})
        .then(res => res.data)
        .then(() => {
          resolve();
        })
        .catch(error => {
          error.type = SEARCH_SETTINGS_ERROR;
          handleAuthenticationError(error, addSearchSettings, reject)
        }); 
    }); 
  }
};









