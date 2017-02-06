import React, {Component} from 'react';

import {
  View,
  Text
} from 'react-native';

import styles from './styles';

export default class DetailView extends Component {

  render() {
  console.log('this.propsasdfe', this.props);
    return (
      <View style={styles.container}>
        <Text>{this.props.restaurant.name}</Text>
      </View>
    );
  };

};
