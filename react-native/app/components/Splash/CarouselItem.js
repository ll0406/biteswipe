import React from 'react';
import {View, Text, Image} from 'react-native';

const CarouselItem = (props) => {

	return(
		<View>
			<Image
			  source={props.image}
			 />
		</View>
		);

};

export default CarouselItem;