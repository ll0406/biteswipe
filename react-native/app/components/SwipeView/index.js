import { connect } from 'react-redux';

import SwipeView from './SwipeView';

import {getRestaurants } from '../../action-creators/restaurants';
import {getCurrentLocation, getSearchSettings} from '../../action-creators/filter';

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.list
  };
}

const mapDispatchToProps = { getRestaurants, getCurrentLocation, getSearchSettings };

export default connect(mapStateToProps, mapDispatchToProps)(SwipeView);
