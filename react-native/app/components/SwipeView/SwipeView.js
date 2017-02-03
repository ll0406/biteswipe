import React, {Component} from 'react';
import { SummaryCard } from './SummaryCard';
import { styles } from './styles';

import { View, Text, Button } from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

  const NoMoreCards = () => {
    return (
      <View>
        <Text>No more cards</Text>
      </View>
    )
  };

export default class Filter extends Component {

  componentDidMount(){
    
    //We need location and settings in order to run the 
    //yelp search for restaurants    
    Promise.all([this.props.getCurrentLocation(), 
        this.props.getSearchSettings()])
    .then(gotSettings => {
       this.props.getRestaurants();
    });

  };

  render () {
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
};
