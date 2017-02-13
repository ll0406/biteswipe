import React from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleSheet
} from 'react-native';

const Updating = props => {
	return (
		<View style={styles.container}>
			<Text>Updating Settings</Text>
			<ActivityIndicator
			  animating={true}
			  size="large"
			/>
		</View>
		);
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.2)'
	},
	text: {
		fontSize: 24
	}
});

export default Updating;