import {connect} from 'react-redux';
import Results from './Results';

const mapStateToProps = state => ({
	restaurants: state.restaurants.results
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
