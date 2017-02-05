import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet, Linking} from 'react-native';
import {connect, Provider} from 'react-redux';
import store from './app/store';
import {Switch, Actions, Scene, Router} from 'react-native-router-flux';


import Splash from './app/components/Splash';
import Login from './app/components/Login';
import Filter from './app/components/Filter';
import Signup from './app/components/Signup';
import Home from './app/components/Home';
import SwipeView from './app/components/SwipeView';
import NavBar from './app/components/NavBar';


const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

const connectedSwitch = connect(mapStateToProps)(Switch);

  //
  //  BUG: 'true' should read 'loggedIn'
  //
const selector = props => (true ? 'loggedIn' : 'notLoggedIn');

const scenes = Actions.create(
  <Scene key="root" component={connectedSwitch} selector={selector} tabs={true}>

    <Scene key="loggedIn">
      <Scene key="filter" component={Filter} title="Filter" hideNavBar={true} initial={true}/>
      <Scene key="home" component={Home}/>
      <Scene key="tinder" component={SwipeView} hideNavBar={true}/>
    </Scene>

    <Scene key="notLoggedIn">
      <Scene key="splash" component={Splash} title="Splash" hideNavBar={true}/>
      <Scene key="login" component={Login} title="Login" hideNavBar={false}/>
      <Scene key="signup" component={Signup} title="Signup" hideNavBar={false}/>
    </Scene>

  </Scene>
);

export default class BiteSwipe extends Component {

  render() {

  const onEnterFilter = function(nextRouterState) {
     //database call to get the previously saved settings.
     store.dispatch(getSearchSettings());
  };

  const onChangeFilter = function (nextRouterState) {
      const coordinates = '' + nextRouterState.location.latitude + ',' + nextRouterState.location.longitude;
      store.dispatch(getCurrentLocation());
      store.dispatch(sendCurrentLocation(coordinates));
  };

  return (
      <Provider store={store}>
        <Router
          navigationBarStyle={styles.navBar}
          titleStyle={styles.navTitle}
          barButtonIconStyle={styles.navBarButton}
          scenes={scenes}/>
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
  }
});

AppRegistry.registerComponent('BiteSwipe', () => BiteSwipe);
