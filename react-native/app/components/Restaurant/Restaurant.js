import React, { Component } from 'react';
import { styles } from './styles';

import { View, Text, Image, StyleSheet } from 'react-native';
import { Tabs } from 'native-base';
import Carousel from 'react-native-looped-carousel';

import Reviews from './Reviews';
import Info from './Info';
import CarouselItem from './CarouselItem';
import Loading from '../Loading';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    Promise.all([
      this.props.getRestaurant(this.props.selectedRestaurant.id),
      this.props.getReviews(this.props.selectedRestaurant.id)
      ])
    .then(() => {
      this.setState({
        loading: false
      })
    })
    .catch(console.log)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.restaurant && this.props.restaurant.id !== nextProps.restaurant.id) {
      // reset loading screen
      this.setState({
        loading: true
      });

      Promise.all([
        this.props.getRestaurant(this.props.selectedRestaurant.id),
        this.props.getReviews(this.props.selectedRestaurant.id)
        ])
      .then(() => {
        this.setState({
          loading: false
        });
      })
      .catch(console.log)

    };
  }

  load() {
    Promise.all([
      this.props.getRestaurant(this.props.selectedRestaurant.id),
      this.props.getReviews(this.props.selectedRestaurant.id)
      ])
    .then(() => {
      this.setState({
        loading: false
      });
    })
    .catch(console.log)
  }

  render() {
    if(this.state.loading) {
      return (
        <Loading />
      )
    } else {
      return (
      <View style={styles.main}>
        { this.props.restaurant.photos ? <Carousel
          style={styles.cardImage}
          delay={10000}
          autoplay={true}>
          {
            this.props.restaurant.photos.map( (photo, index) => {
              return (
                <CarouselItem key={index} image={photo}></CarouselItem>
              )
            })
          }
        </Carousel> : <Text></Text> }
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{this.props.restaurant.name}</Text>
        </View>
        <View>
          <Tabs >
            <Info tabLabel='Info' restaurant={this.props.restaurant} />
            <Reviews tabLabel='Reviews' reviews={this.props.reviews} />
          </Tabs>
        </View>
      </View>
    )}
  }
}
