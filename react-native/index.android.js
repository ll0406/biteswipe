import React, { Component } from 'react';
import {AppRegistry, View, StyleSheet, Linking, AsyncStorage} from 'react-native';
import {connect, Provider} from 'react-redux';
import store from './app/store';
import {Switch, Actions, Scene, Router} from 'react-native-router-flux';
import queryString from 'query-string';
import {persistStore} from 'redux-persist';


import Splash from './app/components/Splash';
import Login from './app/components/Login';
import Filter from './app/components/Filter';
import Signup from './app/components/Signup';
import Home from './app/components/Home';
import SwipeView from './app/components/SwipeView';
import TabBar from './app/components/TabBar';

import Loading from './app/components/Loading';

import {receiveRefreshToken, receiveAccessToken, updateLoggedIn} from './app/action-creators/auth';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

const connectedSwitch = connect(mapStateToProps)(Switch);

const selector = props => (props.loggedIn ? 'loggedIn' : 'notLoggedIn');

let style = StyleSheet.create({
        tabBarStyle: {
            borderTopWidth : .5,
            borderColor    : '#b7b7b7',
            backgroundColor: 'white',
            opacity        : 1
        }
    });


const scenes = Actions.create(
  <Scene key="root" component={connectedSwitch} selector={selector} >


    <Scene key="loggedIn">
      <Scene key="TabBar" component={TabBar} title="Nav" hideNavBar intial={true} />
    </Scene>

    <Scene key="notLoggedIn">
      <Scene key="splash" component={Splash} title="Splash" hideNavBar={true} initial={true}/>
      <Scene key="login" component={Login} title="Login" hideNavBar={true}/>
      <Scene key="signup" component={Signup} title="Signup" hideNavBar={true}/>
    </Scene>

  </Scene>
);

export default class BiteSwipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false
    };
  }

  componentWillMount() {
    persistStore(store, {storage: AsyncStorage}, () => {
      this.setState({
        rehydrated: true
      })
    });
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
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
    if(!this.state.rehydrated) {
      return (
        <Loading/>
        );
    } else {      
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
