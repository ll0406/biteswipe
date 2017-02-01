import React, {Component} from 'react';
import {
  Text, 
  View, 
  Button
} from 'react-native';

import styles from './styles';

import SwipeCards from 'react-native-swipe-cards';

const Card = props => {
  return (
    <View style={styles.card}>
      <Text>{props.name}</Text>
    </View>
  );
};

const NoMoreCards = () => {
  return (
      <View>
        <Text>No more cards</Text>
      </View>
    );
};

export default class Tinder extends Component{

  render() {

    const logout = () => {
      this.props.logout();
    };

    const getRestaurants = () => {
      this.props.getRestaurants();
    }

    const clearRestaurants = () => {
      this.props.receiveRestaurants([]);
    }

    return (
      <View style={styles.container}>
        <SwipeCards
          cards={this.props.restaurants}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={() => <NoMoreCards />}
        />
        <Button
          color="red"
          title="Logout"
          onPress={logout}
        />
        <Button
          color="blue"
          title="Get Restaurants"
          onPress={getRestaurants}
        />
        <Button
          color="green"
          title="Clear Restaurants"
          onPress={clearRestaurants}
        />
      </View>
    );
  };

};
