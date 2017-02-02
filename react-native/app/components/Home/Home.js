import React, {Component} from 'react';

import {
  View,
  Text
} from 'react-native';

import styles from './styles';

export default class Home extends Component {

  render() {
  	console.log("yo, im home");
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    );
  };
  
};