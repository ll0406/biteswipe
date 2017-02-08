import React, {Component} from 'react';
import { SummaryCard } from './SummaryCard';
import { styles } from './styles';
import NoMoreCards from './NoMoreCards';

import { Button } from 'react-native';
import { View, Content, Text, DeckSwiper, Card, Header } from 'native-base';

export default class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: props.swipeCounter
    };
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.restaurants.length !== this.props.restaurants.length) return true;
    if(nextProps.swipeCounter === this.props.restaurants.length) return true;
    return false;
  }

  onSwipeRight() {
    this.props.addToResults(this.props.restaurants[this.props.swipeCounter]);
    this.onSwipeLeft();
  }

  onSwipeLeft() {
    this.props.incrementSwipeCounter();
    if(this.props.restaurants.length - this.props.swipeCounter < 5 && this.props.available) {
      this.props.getRestaurants();
    };
  }

  render() {

    // only slice on when screen has been initialized
    const slicedRestaurants = this.props.restaurants.slice(this.state.startIndex);

    if(!slicedRestaurants.length || this.props.swipeCounter === this.props.restaurants.length) {
      return (
        <View style={styles.swipeViewBackground}>
          <NoMoreCards getRestaurants={this.props.getRestaurants}/>
        </View>
        );
    } else {
      return (
        <View style={styles.swipeViewBackground}>
          <DeckSwiper
            dataSource={slicedRestaurants}
            renderItem={(cardData) => <SummaryCard restaurant={cardData}/>}
            onSwipeRight={(obj) => this.onSwipeRight(obj)}
            onSwipeLeft={() => this.onSwipeLeft()}
          />
        </View>
      );
    };
  }
};
