'use strict'
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import LoginContainer from './containers/LoginContainer';
import CardBrowseContainer from './containers/CardBrowseContainer';
import {getRestaurants} from './action-creators/restaurants';

function onEnterCard(){

	store.dispatch(getRestaurants());

};


render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={LoginContainer} />
        	<Route path='/cards' component={CardBrowseContainer} onEnter={onEnterCard}/>
		</Router>
	</Provider>,
	document.getElementById('main')
);