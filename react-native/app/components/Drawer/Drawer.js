import React, {Component} from 'react';
import Drawer as NativeDrawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Menu from './Menu';

import styles from './styles';

export default class DrawerLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const state = this.props.navigationState;
		const children = state.children;
		return (
			<NativeDrawer
				type="overlay"
				open={state.open}
				content={<Menu/>}
				tapToClose={true}
				openDrawerOffset={0.2}
				panCloseMask={0.2}
				closedDrawerOffset={-3}
				tweenHandler={(ratio) => ({
				  main: { opacity:( 2 - ratio) / 2 }
				})}
				>
				<DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate}/>
			</NativeDrawer>
			);
	};
};