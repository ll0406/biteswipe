import React, {Component} from 'react';
import { SummaryCard } from './SummaryCard';
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

export default class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipeCount: 0
    };
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  onSwipeRight() {
    const restaurants = this.props.restaurants;
    const swipeCount = this.state.swipeCount;
    this.props.addToResults(restaurants[swipeCount]);
    this.setState({
      swipeCount: swipeCount + 1
    });
  }

  render() {

    const getRestaurants = () => {
      this.props.getRestaurants();
    };

    const restaurants = this.props.restaurants;

    if(!restaurants.length) {
      return (
        <NoMoreCards />
        );
    } else {
      return (
        <View style={styles.swipeViewBackground}>
          <DeckSwiper
            dataSource={restaurants}
            renderItem={(cardData) => <SummaryCard restaurant={cardData}/>}
            onSwipeRight={() => this.onSwipeRight()}
          />
        </View>
      );
    };
  }
}
