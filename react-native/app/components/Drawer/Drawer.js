import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Avatar, Drawer as MaterialDrawer, Divider, COLOR, TYPO} from 'react-native-material-design';
import {Actions} from 'react-native-router-flux';
import TimerMixin from 'react-timer-mixin';

import styles from './styles';

// must use createClass to incorporate mixins
const Drawer = React.createClass({
	mixins: [TimerMixin],

	onPress(type) {
		const drawer = this.props.drawer;
		drawer.close();
		// wait for drawer to close
		this.setTimeout(() => {
			switch(type) {
				case 'biteswipe':
					Actions.swipe();
					break;
				case 'search':
					Actions.filter();
					break;
				case 'logout':
					this.props.logout();
					break;
			};
		}, 250);
	},

	onLongPress(type) {
		this.onPress(type);
	},

	render() {

		return (
		    <MaterialDrawer theme='light'>
		        <MaterialDrawer.Header image={<Image source={require('./nav.jpg')} />}>
		            <View style={styles.header}>
		            	<Avatar size={80} image={<Image source={{ uri: "https://theduran.com/wp-content/uploads/2016/12/putin-winking.jpg" }}/>} />
		              <Text style={[styles.headerText, COLOR.paperGrey50, TYPO.paperFontSubhead]}>Vlad Pudding</Text>
		            </View>
		        </MaterialDrawer.Header>

		        <MaterialDrawer.Section
		            items={[
	            		{
	            	    value: 'BiteSwipe',
	            	    onPress: () => this.onPress('biteswipe'),
	            	    onLongPress: () => this.onLongPress('biteswipe')
	            	  },
		            	{
		                value: 'Search Settings',
		                onPress: () => this.onPress('search'),
		                onLongPress: () => this.onLongPress('search')
		              },
		            	{
		                value: 'Logout',
		                onPress: () => this.onPress('logout'),
		                onLongPress: () => this.onLongPress('logout')
		              }
		            ]}
		        />
		    </MaterialDrawer>
		);
	}
});

export default Drawer;
