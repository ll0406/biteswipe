import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Avatar, Drawer as MaterialDrawer, Divider, COLOR, TYPO} from 'react-native-material-design';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

export default class Drawer extends Component{

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
	            	    onPress: () => Actions.swipe(),
	            	    onLongPress: () => Actions.swipe()
	            	  },
		            	{
		                value: 'Search Settings',
		                onPress: () => Actions.filter(),
		                onLongPress: () => Actions.filter()
		              },
		            	{
		                value: 'Logout',
		                onPress: () => this.props.logout(),
		                onLongPress: () => this.props.logout()
		              }
		            ]}
		        />
		    </MaterialDrawer>
		);
	};
};
