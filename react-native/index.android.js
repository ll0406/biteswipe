import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet, Linking} from 'react-native';
import {connect, Provider} from 'react-redux';
import store from './app/store';
import {Switch, Actions, Scene, Router} from 'react-native-router-flux';
import queryString from 'query-string';

import Splash from './app/components/Splash';
import Login from './app/components/Login';
import Signup from './app/components/Signup';

import Home from './app/components/Home';
import Tinder from './app/components/Tinder';

import {receiveRefreshToken, receiveAccessToken, updateLoggedIn} from './app/action-creators/auth';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

const connectedSwitch = connect(mapStateToProps)(Switch);
const selector = props => (props.loggedIn ? 'loggedIn' : 'notLoggedIn');

const scenes = Actions.create(
  <Scene key="root" component={connectedSwitch} selector={selector} tabs={true}>

    <Scene key="loggedIn">
      <Scene key="home" component={Home}/>
      <Scene key="tinder" component={Tinder} hideNavBar={true} initial={true}/>
    </Scene>

    <Scene key="notLoggedIn">
      <Scene key="splash" component={Splash} title="Splash" hideNavBar={true} initial={true}/>
      <Scene key="login" component={Login} title="Login" hideNavBar={false}/>
      <Scene key="signup" component={Signup} title="Signup" hideNavBar={false}/>
    </Scene>

  </Scene>
);

export default class BiteSwipe extends Component {

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    const obj = queryString.parse(event.url.replace('biteswipe://callback?', ''));
    if(obj.refreshToken && obj.accessToken) {
      store.dispatch(receiveRefreshToken(obj.refreshToken));
      store.dispatch(receiveAccessToken(obj.accessToken));
      store.dispatch(updateLoggedIn(true));
    }
  }

  render() {
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
