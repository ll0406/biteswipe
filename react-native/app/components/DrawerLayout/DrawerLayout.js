import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import NativeDrawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Drawer from '../Drawer';

import NavBar from '../NavBar';

import styles from './styles';

const drawerOffset = Platform.OS === 'ios' ? 0.200 : 0.271;

export default class DrawerLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const navigationState = this.props.navigationState;
		const children = navigationState.children;
		const open = navigationState.open;

		return (
			<NativeDrawer
				type="overlay"
				open={open}
				onOpen={() => Actions.refresh({ key: navigationState.key, open: true})}
				onClose={() => Actions.refresh({ key: navigationState.key, open: false})}
				content={<Drawer/>}
				tapToClose={true}
				openDrawerOffset={drawerOffset}
				tweenHandler={ratio => ({
				  	main: { 
				  		opacity:( 2 - ratio) / 2 
				  	}
					})
				}
				>
				<View style={styles.navBarContainer}>
					<NavBar navigationState={navigationState}/>
				</View>
				<DefaultRenderer navigationState={children[children.length - 1]} onNavigate={this.props.onNavigate}/>
			</NativeDrawer>
			);
	};
};