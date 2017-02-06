import React, { Component } from 'react';
import { styles } from './styles';

import { View, Text, Image, StyleSheet } from 'react-native';

export default class extends Component {

  constructor(props){
    super(props)
  };

  componentDidMount(){
    this.props.getRestaurant(this.props.id)
    this.props.getReviews(this.props.id)
  };

  render () {
    {/* 3 more photos to scroll through on carousel */}
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Image
            source={{uri: this.props.restaurant.image_url}}
            style={styles.cardImage}/>
          <Text style={styles.cardTitle}>{this.props.restaurant.name}</Text>
          <View style={styles.cardContent}>
            <Text>Categories:
              {
                this.props.restaurant.categories && this.props.restaurant.categories.map( (category, index) => {
                  return (
                    <Text key={index}>{category.title} </Text>
                  )
                })
              }
            </Text>
            <Text>Rating: {this.props.restaurant.rating}</Text>
            <Text>Price: {this.props.restaurant.price}</Text>
            <Text>{this.props.restaurant.is_closed ? 'Closed now' : 'Open now'}</Text>
            <Text>Phone: {this.props.restaurant.display_phone}</Text>
            <Text>Address:
              {this.props.restaurant.location && this.props.restaurant.location.display_address.map( (address, index) => {
                  return (
                    <Text key={index}>{address} </Text>
                  )
                })
              }
            </Text>
            <Text>Reviews</Text>
            {
              this.props.reviews.map( (review, index) => {
                return (
                <View key={index}>
                  <Text>{review.user.name}: {review.text}</Text>
                  <Text>Rating: {review.rating}</Text>
                </View>
                )
              })
            }
          </View>
        </View>
      </View>
    );
  }
}
