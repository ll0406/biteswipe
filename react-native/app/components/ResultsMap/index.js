import {connect} from 'react-redux';
import ResultsMap from './ResultsMap';

const mapStateToProps = state => ({
	location: state.filter.location
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsMap);
