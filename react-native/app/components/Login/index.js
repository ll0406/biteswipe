import {connect} from 'react-redux';
import {login} from '../../action-creators/login';
import Login from './Login';

const mapStateToProps = state => ({});
const mapStateToDispatch = {login};

export default connect(mapStateToProps, mapStateToDispatch)(Login);