import React from 'react';
import { SummaryCard } from './SummaryCard';
import NavBar from '../NavBar/';
import { styles } from './styles';

import { Button, View } from 'react-native';
import { Container, Content, Text, DeckSwiper, Card, Header } from 'native-base'

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
      <Container style={styles.swipeViewBackground}>
        <NavBar />
        <View>
          <DeckSwiper 
            dataSource={this.props.restaurants}
            renderItem={(cardData) => <SummaryCard restaurant={cardData} />}
          />
        </View>
      </Container>
    )
  }
})
