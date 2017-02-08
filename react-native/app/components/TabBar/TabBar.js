import React, { Component } from 'react';

import {  StyleSheet } from 'react-native';

import { Container, Content, Tabs, View, Text } from 'native-base';

import SwipeView from '../SwipeView';
import Results from '../Results';
import History from '../History';

export class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected
    };
    this._onChangeTab = this._onChangeTab.bind(this);
  }

  componentWillUnmount() {
    this.props.setCurrentTab(this.state.selected);
  }

  _onChangeTab(tab) {
    this.setState({
      selected: tab.i
    });
  }

  render() {

    const count = this.props.results.length;
    const resultsLabel = count > 0 ? `Results (${count})` : 'Results'

    return (
      <Container>
        <View>
            <Tabs locked={true} onChangeTab={this._onChangeTab} initialPage={this.state.selected}>
                <SwipeView tabLabel="Swipe" isSelected={this.state.selected === 0}/>
                <Results tabLabel={resultsLabel} isSelected={this.state.selected === 1}/>
            </Tabs>
        </View>
    </Container>
    );
  }
}
