import React, { Component } from 'react';
import {AppRegistry, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/store';
import {Scene, Router} from 'react-native-router-flux';

import Login from './app/components/Login';
import Tinder from './app/components/Tinder';
import Filter from './app/components/Filter';

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
        <Router>
          <Scene key="root">
            <Scene key="login" component={Login} hideNavBar={true}/>
            <Scene key="tinder" component={Tinder} hideNavBar={true}/>
            <Scene key="filter" component={Filter} initial={true} hideNavBar={true}/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BiteSwipe', () => BiteSwipe);
