import {connect} from 'react-redux';
import Drawer from './Drawer';

import {logout} from '../../action-creators/auth';

const mapStateToProps = state => ({
	user: state.auth.user
});
const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
