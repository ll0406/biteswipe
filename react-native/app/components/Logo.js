import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Logo = props => {

	const {width, color, fontSize, textPadding, textColor} = props;

	const styles = StyleSheet.create({
		circle: {
			width: width,
			height: width,
			borderRadius: width / 2,
			backgroundColor: color
		},
		innerContainer: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center'
		},
		innerText: {
			fontSize: fontSize,
			textAlign: 'center',
			padding: textPadding,
			color: textColor
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