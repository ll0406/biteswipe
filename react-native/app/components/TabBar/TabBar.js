import React, { Component } from 'react';

import {  StyleSheet } from 'react-native';

import { Container, Content, Tabs,View, Text } from 'native-base';

import SwipeView from '../SwipeView';
import Results from '../Results';
import History from '../History';

export class TabBar extends Component {

  render() {
    return (
      <Container>
        <View>
            <Tabs locked={true}>
                <SwipeView tabLabel='Swipe' />
                <Results tabLabel='Results' />
            </Tabs>
        </View>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});