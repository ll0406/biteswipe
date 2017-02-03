import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CarouselItem = (props) => {

	return(
		<View style={styles.container}>
			<Image
				source={props.image}
			  style={styles.image}>
			  <View style={styles.logoContainer}>		  
				  <View style={styles.circle}>
				  	<View style={styles.textContainer}>
						  <Text style={styles.text}>
						  	BiteSwipe
						  </Text>
						  <Icon name="rocket" size={50} color="white"/>
				  	</View>
				  </View>
			  </View>
			</Image>
		</View>
		);

};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		height, width
	},
	logoContainer: {
		flex: 1,
		alignItems: 'center',
		marginTop: height / 10
	},
	circle: {
		width: width / 2,
		height: width / 2,
		borderRadius: width / 4,
		backgroundColor: '#303F9F'
	},
	textContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 30,
		textAlign: 'center',
		padding: 10,
		color: 'white'
	}
});

export default CarouselItem;
