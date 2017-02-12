import React, {Component} from 'react';
import { SummaryCard } from './SummaryCard';
import { styles } from './styles';
import NoMoreCards from './NoMoreCards';

import { Button } from 'react-native';
import { View, DeckSwiper } from 'native-base'
import Immutable from 'immutable';

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
    // compare and check whether restaurants contain same values
    if(!Immutable.is(nextProps.restaurants, this.props.restaurants)) return true;
    // update when we've reached end restaurants
    if(nextProps.swipeCounter === this.props.restaurants.size) return true;
    return false;
  }

  onSwipeRight() {
    this.props.addToResults(this.props.restaurants.get(this.props.swipeCounter));
    this.onSwipeLeft();
  }

  onSwipeLeft() {
    this.props.incrementSwipeCounter();
    // if(this.props.restaurants.size - this.props.swipeCounter < 5 && this.props.available) {
    //   this.props.getRestaurants();
    // };
  }
  
  render() {

    // only slice on when screen has been initialized - startIndex
    // toArray() -> restaurants is a ImmutableJS list
    const slicedRestaurants = this.props.restaurants.toArray().slice(this.state.startIndex);

    if(!slicedRestaurants.length || this.props.swipeCounter === this.props.restaurants.size) {
      return (
        <View style={styles.swipeViewBackground}>
          <NoMoreCards getRestaurants={this.props.getRestaurants}/>
        </View>
        );
    } else if(slicedRestaurants.length === 1) {
      // fucking hax - DeckSwiper requires two 'cards' so we push a copy of the same card into array
      // on next swipe swipeCounter === restaurants.size and we rerender with NoMoreCards
      slicedRestaurants.push(slicedRestaurants[slicedRestaurants.length - 1]);
      return (
        <View style={styles.swipeViewBackground}>
          <DeckSwiper
            dataSource={slicedRestaurants}
            renderItem={(cardData) => <SummaryCard restaurant={cardData}/>}
            onSwipeRight={() => this.onSwipeRight()}
            onSwipeLeft={() => this.onSwipeLeft()}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.swipeViewBackground}>
          <DeckSwiper
            dataSource={slicedRestaurants}
            renderItem={(cardData) => <SummaryCard restaurant={cardData}/>}
            onSwipeRight={() => this.onSwipeRight()}
            onSwipeLeft={() => this.onSwipeLeft()}
          />
        </View>
      );
    };
  }

};


