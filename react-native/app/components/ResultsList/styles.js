import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const imageMargin = 10;

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE'
	},
	rowBack: {
		flex: 1,
		backgroundColor: '#F44336',
		alignItems: 'flex-end',
		margin: 5
	},
	rowBackContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	rowBackText: {
		color: 'white',
		padding: 40
	},
	rowFront: {
		flex: 1,
		borderRadius: 3,
		backgroundColor: 'white',
		elevation: 4
	},
	cardItem: {
		alignItems: 'center'		
	},
	image: {
		height: 150,
		width: width * 0.9,
		margin: imageMargin
	},
	textContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	name: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold'
	},
	address: {
		color: 'white',
		fontSize: 15,
	}
});