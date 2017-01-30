import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import CardBrowse from '../CardBrowse/';

import SwipeCards from 'react-native-swipe-cards';

const Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Text>{this.props.name}</Text>
      </View>
    )
  }
});

const NoMoreCards = () => {
  return (
      <View>
        <Text>No more cards</Text>
      </View>
    )
};

export default React.createClass({

  render() {
    return (
      <CardBrowse />
    )
  }

});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 150,
    borderColor: '#000000',
    borderWidth: 1
  }
})