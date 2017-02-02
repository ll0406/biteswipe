import React, {Component} from 'react';

import {
  Dimensions,
  View,
  Text
} from 'react-native';

const {width, height} = Dimensions.get('window');

import styles from './styles';

import Carousel from 'react-native-looped-carousel'; 
import CarouselItem from './CarouselItem';

import {
  MKButton,
  MKColor
} from 'react-native-material-kit';

import {Actions} from 'react-native-router-flux';


export default class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: { 
        width, height 
      },
      login: false
    };
  }

  _onLayoutDidChange(event) {
    const layout = event.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

  render() {

    const LoginButton = MKButton.coloredButton()
      .withText('Login')
      .withBackgroundColor(MKColor.Teal)
      .withOnPress(() => {
        Actions.login();
      })
      .withStyle(styles.login)
      .withTextStyle(styles.loginText)
      .build();

    const SignupButton = MKButton.coloredButton()
      .withText('Signup')
      .withBackgroundColor(MKColor.Blue)
      .withOnPress(() => {
        Actions.signup();
      })
      .withStyle(styles.signup)
      .withTextStyle(styles.signupText)
      .build();

    return (
      <View style={styles.container}>
        <Carousel 
          delay={10000}
          style={this.state.size}
          autoplay>
          <CarouselItem image={require('./1.jpg')}></CarouselItem>
          <CarouselItem image={require('./2.jpg')}></CarouselItem>
          <CarouselItem image={require('./3.jpg')}></CarouselItem>
          <CarouselItem image={require('./4.jpg')}></CarouselItem>
        </Carousel>
        <View style={styles.buttons}>
          <LoginButton/>
          <SignupButton/>
        </View>
      </View>
    );

  };
  
};
