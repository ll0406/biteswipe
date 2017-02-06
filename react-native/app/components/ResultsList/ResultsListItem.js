import React from 'react';
import {View, Text, Image, Dimensions, StyleSheet} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import {Card, CardItem} from 'native-base';

const ResultsListItem = props => {
	const restaurant = props.restaurant;
	const index = props.index;

	return (
		<SwipeRow rightOpenValue={-120} disableRightSwipe>
			<View style={styles.rowBack}>
				<View style={styles.rowBackContainer}>
					<Text style={styles.rowBackText}>Delete</Text>
				</View>
			</View>
			<Card style={styles.rowFront}>
				<CardItem style={styles.cardItem}>
					<Image style={styles.image} source={{ uri: restaurant.image_url }}>
						<View style={styles.textContainer}>
							<Text style={styles.name}>{restaurant.name}</Text>
							<Text style={styles.address}>{restaurant.location.address1}</Text>
						</View>
					</Image>
				</CardItem>
			</Card>
		</SwipeRow>
		);
};

const {width, height} = Dimensions.get('window');
const imageMargin = 10;

const styles = StyleSheet.create({
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
		flex: 1
	},
	cardItem: {
		flexDirection: 'row'
	},
	image: {
		height: 200,
		width: width - 2 * imageMargin,
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

export default ResultsListItem;