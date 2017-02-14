import { connect } from 'react-redux';
import Filter from './Filter';

import {getRestaurants, clearRestaurants, clearSwipeCounter, setAvailable} from '../../action-creators/restaurants';
import {getCurrentLocation, updateSearchSettings, setTemporaryRadius, setTemporaryPriceRange} from '../../action-creators/filter';

const mapStateToProps = state => {
  return {
    location: state.filter.location,
    settings: state.filter.settings,
    chosenCategories: state.filter.settings.categories,
    temporaryCategories: state.filter.temporaryCategories,
    temporaryRadius: state.filter.temporaryRadius,
    temporaryPriceRange: state.filter.temporaryPriceRange
  };
}

const mapDispatchToProps = dispatch => { 
  return { 
    getRestaurants: () => {
      return dispatch(getRestaurants());
    },
    clearRestaurants: () => {
      return dispatch(clearRestaurants());
    },
    clearSwipeCounter: () => {
      return dispatch(clearSwipeCounter());
    },
    setAvailable: available => {
      return dispatch(setAvailable(available));
    },
    getCurrentLocation: () => { 
      return dispatch(getCurrentLocation());
    } ,
    updateSearchSettings: (priceRange, radius, categories) => { 
      return dispatch(updateSearchSettings(priceRange, radius, categories));
    },
    setTemporaryRadius: radius => { 
      return dispatch(setTemporaryRadius(radius));
    },
    setTemporaryPriceRange: priceRange => { 
      return dispatch(setTemporaryPriceRange(priceRange));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
