import { connect } from 'react-redux';
import { TabBar } from './TabBar';
import { setCurrentTab } from '../../action-creators/ui';

const mapStateToProps = state => ({
	selected: state.ui.tab,
	results: state.restaurants.results
});

const mapDispatchToProps = { setCurrentTab };

export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
