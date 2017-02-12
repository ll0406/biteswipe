import React, {Component} from 'react';
import { SummaryCard } from './SummaryCard';
import { styles } from './styles';
import NoMoreCards from './NoMoreCards';

import { View, DeckSwiper } from 'native-base'

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

    // only slice when rendered - determined by shouldComponentUpdate
    let slicedRestaurants = this.props.restaurants.slice(this.state.startIndex);

    if(!slicedRestaurants.length || this.props.swipeCounter === this.props.restaurants.length) {
      return (
        <View style={styles.swipeViewBackground}>
          <NoMoreCards/>
        </View>
        );
    } else if(slicedRestaurants.length === 1) {
      // this be hax - DeckSwiper requires two 'cards' so we push a empty card into array
      // on next swipe swipeCounter === restaurants.length and we rerender with NoMoreCards
      slicedRestaurants = slicedRestaurants.push({});

      let rendered = false;
      const renderItem = (cardData) => {
        if(!rendered) {
          rendered = true;
          return <NoMoreCards/>
        } else {
          return <SummaryCard restaurant={cardData}/>;
        };
      };

      return (
        <View style={styles.swipeViewBackground}>
          <DeckSwiper
            dataSource={slicedRestaurants}
            renderItem={renderItem}
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


