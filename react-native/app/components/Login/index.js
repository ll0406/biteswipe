import {connect} from 'react-redux';
import {login} from '../../action-creators/auth';
import Login from './Login';

const mapStateToProps = state => ({
	token: state.auth.token
});
const mapStateToDispatch = {login};

export default connect(mapStateToProps, mapStateToDispatch)(Login);