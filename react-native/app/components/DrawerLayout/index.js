import {connect} from 'react-redux';
import DrawerLayout from './DrawerLayout';
import {getCurrentLocation, getSearchSettings} from '../../action-creators/filter';
import {getRestaurants} from '../../action-creators/restaurants';

const mapStateToProps = state => ({});
const mapDispatchToProps = {getCurrentLocation, getSearchSettings, getRestaurants};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerLayout);