import React from 'react';
import {
  Text, 
  View, 
  Image
} from 'react-native';

import styles from './styles';

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
      <SwipeCards
        cards={this.props.restaurants}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
      />
    )
  }

});