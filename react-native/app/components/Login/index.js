import {connect} from 'react-redux';
import {login} from '../../action-creators/auth';
import Login from './Login';

const mapStateToProps = state => ({
	auth: state.auth
});
const mapStateToDispatch = {login};

export default connect(mapStateToProps, mapStateToDispatch)(Login);