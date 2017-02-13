import {connect} from 'react-redux';
import NavBar from './NavBar';

import {clearResults} from '../../action-creators/restaurants';

const mapStateToProps = state => ({
	tab: state.ui.tab
});
const mapDispatchToProps = { clearResults };
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);