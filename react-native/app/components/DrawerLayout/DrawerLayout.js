import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import NativeDrawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Drawer from '../Drawer';
import NavBar from '../NavBar';
import Loading from '../Loading';
import {AUTH_USER_ERROR, LOCATION_ERROR, SEARCH_SETTINGS_ERROR, RESTAURANTS_ERROR} from '../../errors';

import styles from './styles';

const drawerOffset = Platform.OS === 'ios' ? 0.200 : 0.271;

export default class DrawerLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialized: false
		};
	}

	componentDidMount() {
		let promises = [];
		if(!this.props.user) promises.push(this.props.getAuthenticatedUser());
		if(!this.props.location) promises.push(this.props.getCurrentLocation());
		if(!this.props.settings) promises.push(this.props.getSearchSettings());

		// general setup -> drawer should only be mounted once
	  Promise.all(promises)
	  .then(() => {
	  	// restaurants -> ImmutableJS list
	  	if(this.props.restaurants.size > 0) return null;
	  	else return this.props.getRestaurants();
	  })
	  .then(() => {
	  	this.setState({
	  		initialized: true
	  	});	  	
	  })
	  .catch(error => {
	  	// custom error handling
	  	switch(error.type) {
	  		case AUTH_USER_ERROR:
	  			break;
	  		case LOCATION_ERROR:
	  			break;
	  		case SEARCH_SETTINGS_ERROR:
	  			break;
	  		case RESTAURANTS_ERROR:
	  			break;
	  	}
	  	// disable loading screen
	  	this.setState({
	  		initialized: true
	  	});
	  });

	}

	render() {

		const navigationState = this.props.navigationState;
		const children = navigationState.children;
		const current = children[children.length - 1];
		const open = navigationState.open;

		if(!this.state.initialized) {
			return (
				<Loading/>
				);
		} else {
			return (
				<NativeDrawer
					type="overlay"
					open={open}
					onOpen={() => Actions.refresh({ key: navigationState.key, open: true})}
					onClose={() => Actions.refresh({ key: navigationState.key, open: false})}
					content={<Drawer drawer={this._drawer}/>}
					tapToClose={true}
					openDrawerOffset={drawerOffset}
					tweenHandler={ratio => ({
					  	main: {
					  		opacity:( 2 - ratio) / 2
					  	}
						})
					}
					ref={ref => this._drawer = ref}
					>
					<View style={styles.navBarContainer}>
						<NavBar navigationState={navigationState} current={current}/>
					</View>
					<DefaultRenderer navigationState={current} onNavigate={this.props.onNavigate}/>
				</NativeDrawer>
				);
		};
	};
};
