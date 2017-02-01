import { connect } from 'react-redux';
import Filter from './Filter';

import {getRestaurants} from '../../action-creators/restaurants';
import {getCurrentLocation, getSearchSettings} from '../../action-creators/filter';

const mapStateToProps = state => {
  return {
    location: state.filter.location,
    settings: state.filter.settings
  };
}

const mapDispatchToProps = dispatch => { 
  return { 
    getCurrentLocation: () => { 
      dispatch(getCurrentLocation())
    } ,
    getRestaurants: (latitude, longitude, radius, priceRange, categories) => {
      dispatch(getRestaurants(latitude, longitude, radius, priceRange, categories))
    },
    getSearchSettings: () => { 
      dispatch(getSearchSettings())
    } ,
  }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
