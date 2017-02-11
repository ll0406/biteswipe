import { connect } from 'react-redux';
import Filter from './Filter';

import {getRestaurants, clearRestaurants, clearSwipeCounter} from '../../action-creators/restaurants';
import {getCurrentLocation, getSearchSettings, addSearchSettings, receiveSearchSettings} from '../../action-creators/filter';

const mapStateToProps = state => {
  return {
    location: state.filter.location,
    settings: state.filter.settings
  };
}

const mapDispatchToProps = dispatch => { 
  return { 
    getCurrentLocation: () => { 
      return dispatch(getCurrentLocation())
    } ,
    getRestaurants: () => {
      return dispatch(getRestaurants())
    },
    getSearchSettings: () => { 
      return dispatch(getSearchSettings())
    } ,
    addSearchSettings: (priceRange, radius) => { 
      return dispatch(addSearchSettings(priceRange, radius))
    }, 
    receiveSearchSettings: (localSettings) => {
      return dispatch(receiveSearchSettings(localSettings))
    },
    clearRestaurants: () => {
      return dispatch(clearRestaurants())
    },
    clearSwipeCounter: () => {
      return dispatch(clearSwipeCounter())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
