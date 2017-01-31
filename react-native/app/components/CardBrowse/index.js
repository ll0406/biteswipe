import { connect } from 'react-redux';

import { SwipeView } from './SwipeView';

const mapStateToProps = state => {
  return {
    list: state.restaurants.list
  };
}

export default connect(mapStateToProps)(SwipeView);
