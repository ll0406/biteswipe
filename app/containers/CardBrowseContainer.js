import { connect } from 'react-redux';

import { CardBrowse } from '../components/CardBrowse';

const mapStateToProps = state => {
  return {
    list: state.list
  };
}

export default connect(mapStateToProps)(CardBrowse);
