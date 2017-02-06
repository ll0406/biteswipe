import {connect} from 'react-redux';
import ResultsMap from './ResultsMap';
import {getRestaurants} from '../../action-creators/restaurants';

const mapStateToProps = state => ({
	restaurants: state.restaurants.list,
	location: state.filter.location
});
const mapDispatchToProps = { getRestaurants };

export default connect(mapStateToProps, mapDispatchToProps)(ResultsMap);