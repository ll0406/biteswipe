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
                  	
        	dispatch(receiveLocation(location));
        });

	}

}

