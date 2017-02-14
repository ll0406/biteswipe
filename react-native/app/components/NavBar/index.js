import {connect} from 'react-redux';
import NavBar from './NavBar';

import {clearResults} from '../../action-creators/restaurants';
import {setTemporaryCategories, setTemporaryRadius, setTemporaryPriceRange} from '../../action-creators/filter';

const mapStateToProps = state => ({
	tab: state.ui.tab
});
const mapDispatchToProps = { clearResults, setTemporaryCategories, setTemporaryRadius, setTemporaryPriceRange };
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);