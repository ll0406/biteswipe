import React, { Component } from 'react';
import { styles } from './styles';

import { View, Text, Image, TouchableHighlight, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import LinearGradient from 'react-native-linear-gradient';

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
            style={styles.cardImage}>
            <LinearGradient 
              colors={['transparent', '#777']} 
              start={{x:0, y:.8}}
              style={styles.cardImage} />   
          </Image>
        </TouchableHighlight>
        <Text style={styles.cardTitle}>{this.props.restaurant.name}</Text>
        <Text style={styles.cardSubTitle}>{this.props.restaurant.categories[0].title}</Text>
        <View style={styles.cardContent}>
          <HighlightsBox restaurant={this.props.restaurant}/>
          <View style={styles.ratingView}>
            <RatingStars rating={this.props.restaurant.rating}/>
          
            <Image source={require('./img/Yelp.png')} style={styles.yelpImg} />

          </View>

        </View>
      </View>
    );
  }
})
