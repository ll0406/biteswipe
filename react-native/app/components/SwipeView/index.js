import { connect } from 'react-redux';

import { SwipeView } from './SwipeView';

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.list
  };
}

export default connect(mapStateToProps)(SwipeView);
