import React, {Component} from 'react';
import { SummaryCard } from './SummaryCard';
import { styles } from './styles';

import { View, Text, Button } from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

import {Actions} from 'react-native-router-flux';

const NoMoreCards = () => {
  return (
    <View>
      <Text>No more cards</Text>
    </View>
  )
};

export default class SwipeView extends Component {

  render() {

    const getRestaurants = () => {
      this.props.getRestaurants();
    }

    return (
      <View style={styles.swipeViewBackground}>
        <SwipeCards
          cards={this.props.restaurants}
          renderCard={(cardData) => <SummaryCard restaurant={cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          />
        <Button
          color="blue"
          title="Get Restaurants"
          onPress={getRestaurants}
        />
      </View>
    )
  }
}
