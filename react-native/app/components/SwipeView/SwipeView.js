import React, {Component} from 'react';
import { SummaryCard } from './SummaryCard';
import { styles } from './styles';
import NoMoreCards from './NoMoreCards';

import { View } from 'native-base'
import DeckSwiper from '../DeckSwiper';

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
    // compare and check whether restaurants have the same reference
    // since we use concat when we add new restaurants, this only fires then
    if(nextProps.restaurants !== this.props.restaurants) return true;
    // update when we've reached end of restaurants
    if(nextProps.swipeCounter === this.props.restaurants.length) return true;
    return false;
  }

  onSwipeRight(restaurant) {
    this.props.addToResults(restaurant);
    this.onSwipeLeft();
  }

  onSwipeLeft() {
    this.props.incrementSwipeCounter();
    if(this.props.restaurants.length - this.props.swipeCounter < 5 && this.props.available) {
      // this.props.getRestaurants();
    };
  }
  
  render() {

    // only slice when rendered - determined by shouldComponentUpdate
    let slicedRestaurants = this.props.restaurants.slice(this.state.startIndex);

    if(!slicedRestaurants.length || this.props.swipeCounter === this.props.restaurants.length) {
      return (
        <View style={styles.swipeViewBackground}>
          <NoMoreCards/>
        </View>
        );
    } else {
      return (
        <View style={styles.swipeViewBackground}>
          <DeckSwiper
            dataSource={slicedRestaurants}
            renderItem={(cardData) => <SummaryCard restaurant={cardData}/>}
            onSwipeRight={restaurant => this.onSwipeRight(restaurant)}
            onSwipeLeft={() => this.onSwipeLeft()}
            renderEmpty={() => <NoMoreCards/>}
          />
        </View>
      );
    };
  }

};


