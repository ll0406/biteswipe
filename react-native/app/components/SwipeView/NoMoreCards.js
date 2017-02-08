import React from 'react';
import {View, Text, Button, Dimensions, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

const NoMoreCards = () => {

	const filter = () => Actions.filter();

  return (
  	<View style={styles.card}>
  		<Text></Text>
  	  <Button title="Update Search Settings" onPress={filter}/>
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
	}
});

export default NoMoreCards;