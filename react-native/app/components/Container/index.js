import {connect} from 'react-redux';
import Container from './Container';

const mapStateToProps = state => ({
	loggedIn: state.auth.loggedIn
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Container);