import React, { Component } from 'react';

import {  StyleSheet } from 'react-native';

import { Container, Content, Tabs, View, Text } from 'native-base';

import myTheme from './light.js'

import SwipeView from '../SwipeView';
import Results from '../Results';
import History from '../History';

export class TabBar extends Component {

  render() {
    return (
      <Container theme={myTheme}>
        <View>
            <Tabs locked={true}>
                <History tabLabel='History' />
                <SwipeView tabLabel='Swipe' />
                <Results tabLabel='Results' />
            </Tabs>
        </View>
    </Container>
    );
  }
}
