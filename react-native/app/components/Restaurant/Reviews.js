import React, {Component} from 'react';

import {
  Text, Image
} from 'react-native';

import { View } from 'native-base';

import { styles } from './styles';

export default class Reviews extends Component {

  render() {
    return (
      <View style={styles.tab}>
        {
          this.props.reviews.map( (review, index) => {
            return (
            <View key={index} style={styles.card}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{uri: review.user.image_url}}
                  style={styles.reviewImage} />
              </View>
              <Text style={styles.reviewName}>{review.user.name} on {review.time_created}</Text>
              <Text style={styles.pushDown}>{review.text}</Text>
              <Text>Rating: {review.rating}</Text>
            </View>
            )
          })
        }
      </View>
    );
  };
};
