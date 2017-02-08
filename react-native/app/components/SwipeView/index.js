import { connect } from 'react-redux';
import SwipeView from './SwipeView';
import {getRestaurants, removeRestaurant, incrementSwipeCounter, addToResults} from '../../action-creators/restaurants';

const mapStateToProps = state => {
  return {
    swipeCounter: state.restaurants.swipeCounter,
    available: state.restaurants.available,
    restaurants: state.restaurants.list
  };
};

const mapDispatchToProps = { getRestaurants, removeRestaurant, incrementSwipeCounter, addToResults };

export default connect(mapStateToProps, mapDispatchToProps)(SwipeView);
