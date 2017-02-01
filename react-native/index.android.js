import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './app/store';
import { Scene, Router } from 'react-native-router-flux';

import Login from './app/components/Login';
import Tinder from './app/components/Tinder';
import SwipeView from './app/components/SwipeView';
import NavBar from './app/components/NavBar';


export default class BiteSwipe extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar={true}/>
            <Scene key="swipeView" component={SwipeView} hideNavBar={true}/>
            <Scene key="NavBar" component={NavBar} initial={true} hideNavBar={true}/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BiteSwipe', () => BiteSwipe);
