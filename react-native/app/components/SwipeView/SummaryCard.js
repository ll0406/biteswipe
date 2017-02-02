import React, { Component } from 'react';
import { SwipeButtons } from './SwipeButtons';
import { styles } from './styles';

import { View, Text, Image, StyleSheet } from 'react-native';

export const SummaryCard = React.createClass({

  render () {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Image 
            source={{uri: 'http://www.fillmurray.com/284/196'}} 
            style={styles.cardImage}/>
          <Text style={styles.cardTitle}>{this.props.restaurant.name}</Text>
          <View style={styles.cardContent}>
            {
              (this.props.restaurant.categories === undefined) 
              ? <Text>No 'cuisine' data</Text> 
              : <Text>{this.props.restaurant.categories[0].title}</Text> 
            }
            <Text>Rating: No rating</Text>
          </View>
        </View>
      </View>
    );
  }
})
