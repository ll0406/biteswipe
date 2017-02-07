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

  componentDidMount(){
    //We need location and settings in order to run the
    //yelp search for restaurants
    Promise.all([this.props.getCurrentLocation(),
        this.props.getSearchSettings()])
    .then(gotSettings => {
       this.props.getRestaurants()
    });
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
    }

    return (
      <View style={styles.swipeViewBackground}>
        <DeckSwiper
          dataSource={this.props.restaurants}
          renderItem={(cardData) => <SummaryCard restaurant={cardData} />}
          onSwipeRight={() => this.onSwipeRight()}
        />
      </View>
    )
  }
}
