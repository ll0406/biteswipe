import {connect} from 'react-redux';
import Tinder from './Tinder';

import {logout} from '../../action-creators/auth';
import {getRestaurants, receiveRestaurants} from '../../action-creators/restaurants';

const mapStateToProps = state => ({
	accessToken: state.auth.accessToken,
	restaurants: state.restaurants.list
});
const mapStateToDispatch = {logout, getRestaurants, receiveRestaurants};

export default connect(mapStateToProps, mapStateToDispatch)(Tinder);