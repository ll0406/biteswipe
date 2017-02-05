import React, { Component } from 'react';
import { SwipeButtons } from './SwipeButtons';
import { styles } from './styles';

import { View, Text, Image, StyleSheet } from 'react-native';

import { HighlightsBox } from './HighlightsBox';
import { RatingStars } from './RatingStars';

export const SummaryCard = React.createClass({  
  render () {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Image 
            source={{uri: this.props.restaurant.image_url}} 
            style={styles.cardImage}/>
          <Text style={styles.cardTitle}>{this.props.restaurant.name}</Text>
          <Text style={styles.cardSubTitle}>{this.props.restaurant.categories[0].title}</Text>
          <View style={styles.cardContent}>
            <HighlightsBox restaurant={this.props.restaurant}/>
            <View style={styles.ratingView}>
            <RatingStars rating={this.props.restaurant.rating}/>
            </View>
          </View>
        </View>
      </View>
    );
  }
})
