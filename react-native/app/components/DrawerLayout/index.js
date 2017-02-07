import {connect} from 'react-redux';
import DrawerLayout from './DrawerLayout';
import {getAuthenticatedUser} from '../../action-creators/auth';
import {getCurrentLocation, getSearchSettings} from '../../action-creators/filter';
import {getRestaurants} from '../../action-creators/restaurants';

const mapStateToProps = state => ({});
const mapDispatchToProps = {getAuthenticatedUser, getCurrentLocation, getSearchSettings, getRestaurants};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerLayout);