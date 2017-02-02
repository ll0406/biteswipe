import {connect} from 'react-redux';
import {signup} from '../../action-creators/auth';
import Signup from './Signup';

const mapStateToProps = state => ({});
const mapDispatchToProps = {signup};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);