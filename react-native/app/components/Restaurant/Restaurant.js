import React, { Component } from 'react';
import { styles } from './styles';

import { View, Text, Image, StyleSheet } from 'react-native';
import { Tabs } from 'native-base';

import Reviews from './Reviews';
import Info from './Info';

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
      <View style={styles.main}>
        <Image
          source={{uri: this.props.restaurant.image_url}}
          style={styles.cardImage}/>
        <Text style={styles.cardTitle}>{this.props.restaurant.name}</Text>
        <View>
          <Tabs >
            <Info tabLabel='Info' restaurant={this.props.restaurant} />
            <Reviews tabLabel='Reviews' reviews={this.props.reviews} />
          </Tabs>
        </View>
      </View>
    );
  }
}
