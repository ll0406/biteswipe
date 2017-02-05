import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Logo = props => {

	const {width, height, color} = props;

	const styles = StyleSheet.create({
		image: {
			height, width
		},
		circleContainer: {
			flex: 1,
			alignItems: 'center',
			marginTop: height / 10
		},
		circle: {
			width: width / 2,
			height: width / 2,
			borderRadius: width / 4,
			backgroundColor: color
		},
		innerContainer: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center'
		},
		innerText: {
			fontSize: 30,
			textAlign: 'center',
			padding: 10,
			color: 'white'
		}
	});

	return (
		  <View style={styles.circle}>
		  	<View style={styles.innerContainer}>
				  <Text style={styles.innerText}>
				  	BiteSwipe
				  </Text>
				  <Icon name="github" size={50} color="white"/>
		  	</View>
		  </View>
		);
};

export default Logo;