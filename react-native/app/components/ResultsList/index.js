import {connect} from 'react-redux';
import ResultsList from './ResultsList';
import {getRestaurants} from '../../action-creators/restaurants';

const mapStateToProps = state => ({
	restaurants: state.restaurants.list
});
const mapDispatchToProps = { getRestaurants };

export default connect(mapStateToProps, mapDispatchToProps)(ResultsList);