import {connect} from 'react-redux';
import DrawerLayout from './DrawerLayout';
import {getAuthenticatedUser, logout} from '../../action-creators/auth';
import {getCurrentLocation, getSearchSettings} from '../../action-creators/filter';
import {getRestaurants} from '../../action-creators/restaurants';

const mapStateToProps = state => ({});
const mapDispatchToProps = {getAuthenticatedUser, logout, getCurrentLocation, getSearchSettings, getRestaurants};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerLayout);