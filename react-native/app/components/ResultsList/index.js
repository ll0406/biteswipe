import {connect} from 'react-redux';
import ResultsList from './ResultsList';
import {removeFromResults} from '../../action-creators/restaurants';

const mapStateToProps = state => ({});
const mapDispatchToProps = {removeFromResults};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);
