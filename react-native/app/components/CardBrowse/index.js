import { connect } from 'react-redux';

import { CardBrowse } from './CardBrowse';

const mapStateToProps = state => {
  return {
    list: state.restaurants.list
  };
}

export default connect(mapStateToProps)(CardBrowse);
