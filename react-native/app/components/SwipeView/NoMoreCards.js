import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

const NoMoreCards = props => {

	const filter = () => Actions.filter();

  return (
  	<View style={styles.card}>
  		<Text style={styles.text}>No Restaurants Found</Text>
  		<TouchableOpacity onPress={filter}>
	  		<Image source={require('./img/veggies.jpg')} style={styles.image}>
	  			<View style={styles.imageIconContainer}>
	  				<Icon name="refresh" size={100} color="white"/>
	  			</View>
	  		</Image>
  		</TouchableOpacity>
  	</View>
  )
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	card: {
	  elevation: 4,
	  alignItems: 'center',
	  justifyContent: 'center',
	  width: width * 0.85,
	  height: height * 0.7,
	  borderRadius: 3,
	  backgroundColor: '#ffffff',
	  margin: 25,
	  alignSelf: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black'
	},
	image: {
		width: width * 0.6,
		height: height * 0.5,
		margin: 20
	},
	imageIconContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default NoMoreCards;