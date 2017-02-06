import { connect } from 'react-redux';
import Restaurant from './Restaurant';

import {getRestaurant, getReviews} from '../../action-creators/restaurants';

const mapStateToProps = state => {
  return {
    restaurant: state.restaurants.restaurant,
    reviews: state.restaurants.reviews
  };
}

const mapDispatchToProps = dispatch => { 
  return { 
    getRestaurant: (id) => { 
      dispatch(getRestaurant(id))
    } ,
    getReviews: (id) => {
      dispatch(getReviews(id))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
