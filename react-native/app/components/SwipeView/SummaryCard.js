import React, { Component } from 'react';
import { styles } from './styles';

import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { HighlightsBox } from './HighlightsBox';
import { RatingStars } from './RatingStars';

export const SummaryCard = React.createClass({  

  render () {
    const goToDetailView = () => Actions.detailView({restaurant: this.props.restaurant});
    return (
      <View style={styles.card}>
        <TouchableHighlight onPress={goToDetailView}>
          <Image 
            source={{uri: this.props.restaurant.image_url}} 
            style={styles.cardImage}/>
        </TouchableHighlight>
        <Text style={styles.cardTitle}>{this.props.restaurant.name}</Text>
        <Text style={styles.cardSubTitle}>{this.props.restaurant.categories[0].title}</Text>
        <View style={styles.cardContent}>
          <HighlightsBox restaurant={this.props.restaurant}/>
          <View style={styles.ratingView}>
          <RatingStars rating={this.props.restaurant.rating}/>
          </View>
        </View>
      </View>
    );
  }
})
