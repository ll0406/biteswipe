import { connect } from 'react-redux';
import Restaurant from './Restaurant';

import {getRestaurant, getReviews} from '../../action-creators/restaurants';

const mapStateToProps = state => {
  return {
    restaurant: state.restaurants.restaurant,
    reviews: state.restaurants.reviews
  };
}

const mapDispatchToProps = {getRestaurant, getReviews}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
