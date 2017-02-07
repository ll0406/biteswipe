import { connect } from 'react-redux';

import SwipeView from './SwipeView';

import {getRestaurants} from '../../action-creators/restaurants';

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.list
  };
}

const mapDispatchToProps = { getRestaurants };

export default connect(mapStateToProps, mapDispatchToProps)(SwipeView);
