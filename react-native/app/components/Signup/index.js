import {connect} from 'react-redux';
import {signup} from '../../action-creators/auth';
import Signup from './Signup';

const mapStateToProps = state => ({
	signupError: state.auth.signupError
});
const mapStateToDispatch = {signup};

export default connect(mapStateToProps, mapStateToDispatch)(Signup);