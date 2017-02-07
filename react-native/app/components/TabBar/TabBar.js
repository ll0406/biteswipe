import React, { Component } from 'react';

import {  StyleSheet } from 'react-native';

import { Container, Content, Tabs,View, Text } from 'native-base';

import SwipeView from '../SwipeView';
import Results from '../Results';
import History from '../History';

export class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0
    };
    this._onChangeTab = this._onChangeTab.bind(this);
  }

  _onChangeTab(tab) {
    this.setState({
      selected: tab.i
    });
  }

  render() {
    return (
      <Container>
        <View>
            <Tabs locked={true} onChangeTab={this._onChangeTab} page={this.state.selected}>
                <SwipeView tabLabel='Swipe' />
                <Results tabLabel='Results' />
            </Tabs>
        </View>
    </Container>
    );
  }
}
