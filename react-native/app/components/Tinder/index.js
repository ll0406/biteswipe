import {connect} from 'react-redux';
import Tinder from './Tinder';

const mapStateToProps = state => ({
	restaurants: state.restaurants.list
});
const mapStateToDispatch = {};

export default connect(mapStateToProps, mapStateToDispatch)(Tinder);