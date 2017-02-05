import React from 'react';
import { SummaryCard } from './SummaryCard';
import NavBar from '../NavBar/';
import { styles } from './styles';

import { Button } from 'react-native';
import { View, Content, Text, DeckSwiper, Card, Header } from 'native-base'

const NoMoreCards = () => {
  return (
    <View>
      <Text>No more cards</Text>
    </View>
  )
};

export const SwipeView = React.createClass({

  render () {

    const getRestaurants = () => {
      this.props.getRestaurants();
    }

    return (
      <View style={[styles.swipeViewBackground, {flex:1}]}>
          <DeckSwiper 
            scrollEnabled={false}
            dataSource={this.props.restaurants}
            renderItem={(cardData) => <SummaryCard restaurant={cardData} />}
          />
      </View>
    )
  }
})
