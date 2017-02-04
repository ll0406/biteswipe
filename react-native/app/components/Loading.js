import React, {Component} from 'react';

import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet
} from 'react-native';

const Loading = (props) => {
	return (
		<View style={styles.container}>
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
		alignItems: 'center'
	}
});

export default Loading;