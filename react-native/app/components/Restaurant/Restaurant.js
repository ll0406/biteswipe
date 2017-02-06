import React, { Component } from 'react';
import { styles } from './styles';

import { View, Text, Image, StyleSheet } from 'react-native';

export default class extends Component {

  constructor(props){
    super(props)
  };

  componentDidMount(){
    this.props.getRestaurant(this.props.id)
  };

  render () {
    {/* want to add address, categories, 3 more photos to scroll through? */}
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Image
            source={{uri: this.props.restaurant.image_url}}
            style={styles.cardImage}/>
          <Text style={styles.cardTitle}>{this.props.restaurant.name}</Text>
          <View style={styles.cardContent}>
            <Text>{/* this.props.restaurant.categories */}</Text>
            <Text>Rating: {this.props.restaurant.rating}</Text>
            <Text>Price: {this.props.restaurant.price}</Text>
            <Text>{this.props.restaurant.is_closed ? 'Closed now' : 'Open now'}</Text>
            <Text>Phone: {this.props.restaurant.display_phone}</Text>
          </View>
        </View>
      </View>
    );
  }
}
