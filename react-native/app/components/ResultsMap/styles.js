import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
 container: {
 	flex: 1
 },
 map: {
 	height: height,
 	width: width
 }
});