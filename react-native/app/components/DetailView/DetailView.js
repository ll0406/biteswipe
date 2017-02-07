import React, {Component} from 'react';

import {
  View,
  Text
} from 'react-native';

import styles from './styles';

export default class DetailView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.restaurant.name}</Text>
      </View>
    );
  };

};
