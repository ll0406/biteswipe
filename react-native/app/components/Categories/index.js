import { connect } from 'react-redux';
import Categories from './Categories';

import {getRestaurants} from '../../action-creators/restaurants';
import {getCurrentLocation, getSearchSettings, addSearchSettings, receiveSearchSettings, addCategory, removeCategory} from '../../action-creators/filter';
import {getCategories} from '../../action-creators/categories';

const mapStateToProps = state => {
  return {
    location: state.filter.location,
    settings: state.filter.settings
  };
}

const mapDispatchToProps = dispatch => { 
  return {     
    getCategories: () => {
      dispatch(getCategories())
    },
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
    },
    addCategory: (category) => {
      dispatch(addCategory(category))
    },
    removeCategory: (category) => {
      dispatch(removeCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
