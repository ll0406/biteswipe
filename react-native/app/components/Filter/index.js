
import { connect } from 'react-redux';
import Filter from './Filter';

const mapStateToProps = state => {
  return {
    location: state.filter.location
  };
}

export default connect(mapStateToProps)(Filter);
