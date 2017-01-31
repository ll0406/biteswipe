import React from 'react';
import { SummaryCard } from './SummaryCard';
import { styles } from './styles';

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
      <View style={{backgroundColor: '#F0F0F0', flex:1, elevation:0}}>
        <SwipeCards 
          cards={this.props.restaurants}
          renderCard={(cardData) => <SummaryCard restaurant={cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
          />
      </View>
    )
  }
})
