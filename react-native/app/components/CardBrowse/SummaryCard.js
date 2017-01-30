import React, { Component } from 'react';
import { SwipeButtons } from './SwipeButtons';

import { View, Text, Image, StyleSheet } from 'react-native';

import { getTheme } from 'react-native-material-kit';

export const SummaryCard = props => {
  return (
    <View>
      <Image source={{uri: 'http://www.fillmurray.com/284/196' }} style={{width: 100, height: 100}}/>
      <Text>{props.restaurant.name}</Text>
      <View>
        {
          (props.restaurant.cuisines === '') 
          ? <Text>No 'cuisine' data</Text> 
          : <Text>{props.restaurant.cuisines.split(', ').join(' / ')}</Text> 
        }
        <Text>Rating: No rating</Text>
      </View>
    </View>
    
  );
}


// const styles = StyleSheet.create({
//   card: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 300,
//     height: 150,
//     borderColor: '#000000',
//     borderWidth: 1
//   }
// })