import { connect } from 'react-redux';
import Categories from './Categories';

import {getRestaurants} from '../../action-creators/restaurants';
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
      dispatch(getCurrentLocation())
    } ,
    getRestaurants: () => {
      dispatch(getRestaurants())
    },
    getSearchSettings: () => { 
      dispatch(getSearchSettings())
    } ,
    addSearchSettings: (priceRange, radius, categories) => {       //update to the db 
      dispatch(addSearchSettings(priceRange, radius, categories))
    }, 
    receiveSearchSettings: (localSettings) => {
      dispatch(receiveSearchSettings(localSettings))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
