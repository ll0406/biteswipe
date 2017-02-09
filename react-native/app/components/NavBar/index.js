import { connect } from 'react-redux';
import NavBar from './NavBar';

const mapStateToProps = state => ({
	routes: state.routes
});
const mapDispatchToProps = {};
export default connect()(NavBar);