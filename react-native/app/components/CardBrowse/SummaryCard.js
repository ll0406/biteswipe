import React, { Component } from 'react';
import { SwipeButtons } from './SwipeButtons';

import { View, Text, Image, StyleSheet } from 'react-native';

import { getTheme } from 'react-native-material-kit';

export const SummaryCard = props => {
  return (
    <View style={styles.card}>
      <Image 
        source={{uri: 'http://www.fillmurray.com/284/196'}} 
        style={{width: 350, height: 350}}/>
      <Text style={styles.cardTitle}>{props.restaurant.name}</Text>
      <View style={styles.cardContent}>
        {
          (props.restaurant.categories === undefined) 
          ? <Text>No 'cuisine' data</Text> 
          : <Text>{props.restaurant.categories[0].title}</Text> 
        }
        <Text>Rating: No rating</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: 350,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#ffffff',
    elevation: 4
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 24,
    padding: 16,
    position: "absolute",
    top: 300
  }
})
