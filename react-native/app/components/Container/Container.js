import React, {Component} from 'react';
import {View} from 'react-native';
import DrawerLayout from '../DrawerLayout';

// container is used to force DrawerLayout to unmount when user logs out
const Container = props => {
	if(!props.loggedIn) {
		return (
			<View/>
			);
	} else {
		return (
			<DrawerLayout {...props}/>
			);
	};
};

export default Container;