import axios from 'axios';
import {RECEIVE_LOCATION} from '../constants';

export const receiveLocation = location =>
({
  type: RECEIVE_LOCATION,
  location
});

export const getCurrentLocation = () => {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

    console.log("the location: \n\n\n\n\n", receiveLocation);

    dispatch(receiveLocation(location));
    });

	};

};

//calls the database, retrieves the previously saved search settings
export const getSearchSettings = () => {
  return dispatch => {
    axios.get('http://192.168.115.79:1337/api/searchSettings')
    .then()
  };
};



export const sendFilterOptions = (options) => {
  return dispatch => {
    axios.post('http://192.168.115.79:1337/api/restaurants', options)
    .then(res => res.data)
    .then(restaurants => {
      res.json(restaurants);
    })
    .catch(console.err);
  };
};



