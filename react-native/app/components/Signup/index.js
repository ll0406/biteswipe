import {connect} from 'react-redux';
import {signup} from '../../action-creators/auth';
import Signup from './Signup';

const mapStateToProps = state => ({
	signupError: state.auth.signupError
});
const mapDispatchToProps = {signup};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);