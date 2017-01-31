import React from 'react';
import { SummaryCard } from './SummaryCard';

import { View, Text } from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

const NoMoreCards = () => {
  return (
    <View>
      <Text>No more cards</Text>
    </View>
  )
};

export const SwipeView = React.createClass({
  render () {
    return (
      <SwipeCards 
        cards={this.props.restaurants}
        renderCard={(cardData) => <SummaryCard restaurant={cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        />
    )
  }
})
