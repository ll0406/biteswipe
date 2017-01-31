
import { connect } from 'react-redux';
import Filter from '../components/Filter';

const mapStateToProps = state => {
  return {
    location: state.location
  };
}

export default connect(mapStateToProps)(Filter);