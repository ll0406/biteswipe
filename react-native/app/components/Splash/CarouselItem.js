import React from 'react';
import {View, Image,  Dimensions, StyleSheet} from 'react-native';
import Logo from '../Logo';

const CarouselItem = (props) => {

	return(
		<View style={styles.container}>
			<Image
				source={props.image}
			  style={styles.image}>
			  <View style={styles.logoContainer}>		  
			  	<Logo width={width / 2} color={props.color} fontSize={30} textPadding={10} textColor="white"/>
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
	}
});

export default CarouselItem;
