// import React, {Component} from 'react';
// import {Text, View, Image} from 'react-native';
// import styles from './styles';

// import SummaryCard from '../SummaryCard';
// import SwipeCards from 'react-native-swipe-cards';

// const NoMoreCards = () => {
//   return (
//       <View>
//         <Text>No more cards</Text>
//       </View>
//     )
// }

// export default class Tinder extends Component{

//   render() {
//     return (
//       <SwipeCards
//         cards={this.props.restaurants}
//         renderCard={(cardData) => <SummaryCard {...cardData} />}
//         renderNoMoreCards={() => <NoMoreCards />}
//       />
//     )
//   }

// };

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {SummaryCard} from '../CardBrowse/SummaryCard';

import SwipeCards from 'react-native-swipe-cards';

const Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Text>{this.props.name}</Text>
      </View>
    )
  }
});

const NoMoreCards = () => {
  return (
      <View>
        <Text>No more cards</Text>
      </View>
    )
};

export default React.createClass({

  render() {
    return (
      <SwipeCards
        cards={this.props.restaurants}
        renderCard={(cardData) => <SummaryCard restaurant={cardData}/>}
        renderNoMoreCards={() => <NoMoreCards />}
      />
    )
  }

});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 150,
    borderColor: '#000000',
    borderWidth: 1
  }
})