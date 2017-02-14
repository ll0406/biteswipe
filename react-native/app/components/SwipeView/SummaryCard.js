import React, { Component } from 'react';
import { styles } from './styles';

import { View, Text, Image, TouchableHighlight, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { HighlightsBox } from './HighlightsBox';
import { RatingStars } from './RatingStars';

export const SummaryCard = React.createClass({
  render () {
    const restaurant = this.props.restaurant;
    const goToRestaurant = () => Actions.restaurant({selectedRestaurant: restaurant});
    return (
      <View style={styles.card}>
        <TouchableHighlight onPress={goToRestaurant}>
          <Image 
            source={{uri: restaurant.image_url || 'http://www.fillmurray.com/284/196'}} 
            style={styles.cardImage}>
            <View style={styles.cardTitleContainer}>
              <Text style={styles.cardTitle}>{restaurant.name}</Text>
            </View>
          </Image>
        </TouchableHighlight>
        <Text style={styles.cardSubTitle}>{restaurant.categories[0].title}</Text>
        <View style={styles.cardContent}>
          <HighlightsBox restaurant={restaurant}/>
          <View style={styles.rowContainer}>
            <View style={styles.ratingView}>
              <RatingStars rating={restaurant.rating}/>
            </View>
            <View style={styles.yelpContainer}>
              <TouchableHighlight
                style={styles.yelpButton}
                onPress={() => Linking.openURL(restaurant.url)}>
                <Image
                  source={require('./img/Yelp.png')}
                  style={styles.yelpImg} />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
})
