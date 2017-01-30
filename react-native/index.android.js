import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/store';
import {Scene, Router} from 'react-native-router-flux';

import Splash from './app/components/Splash';
import Login from './app/components/Login';
import Signup from './app/components/Signup';

import Tinder from './app/components/Tinder';

export default class BiteSwipe extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router 
          navigationBarStyle={styles.navBar} 
          titleStyle={styles.navTitle}
          barButtonIconStyle={styles.navBarButton}>
          <Scene key="root">
            <Scene key="splash" component={Splash} initial={true} hideNavBar={true}/>
            <Scene key="login" component={Login} title="Login" hideNavBar={false}/>
            <Scene key="signup" component={Signup} title="Signup" hideNavBar={false}/>

            <Scene key="home" tabs={true} hideNavBar={true} tabBarStyle={styles.tabBarStyle}>
              <Scene key="tinder" component={Tinder} hideNavBar={true}/>
            </Scene>

          </Scene>
        </Router>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#2196F3'
  },
  navTitle: {
    color: 'white'
  },
  navBarButton: {
    tintColor: 'white'
  },
  tabBarStyle: {
      borderTopWidth: 0.5,
      borderColor: '#b7b7b7',
      backgroundColor: 'white',
      opacity: 1
  }
})

AppRegistry.registerComponent('BiteSwipe', () => BiteSwipe);
