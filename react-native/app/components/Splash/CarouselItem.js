import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const CarouselItem = (props) => {

	return(
		<View style={styles.container}>
			<Image
				source={props.image}
			  style={styles.image}>
			  <View style={styles.circleContainer}>		  
				  <View style={[styles.circle, {backgroundColor: props.color}]}>
				  	<View style={styles.innerContainer}>
						  <Text style={styles.innerText}>
						  	BiteSwipe
						  </Text>
						  <Icon name="github" size={50} color="white"/>
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
	circleContainer: {
		flex: 1,
		alignItems: 'center',
		marginTop: height / 10
	},
	circle: {
		width: width / 2,
		height: width / 2,
		borderRadius: width / 4,
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

export default CarouselItem;
