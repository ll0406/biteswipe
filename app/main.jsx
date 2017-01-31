'use strict'
import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import LoginContainer from './containers/LoginContainer';
import CardBrowseContainer from './containers/CardBrowseContainer';
import {getRestaurants} from './action-creators/restaurants';
import {getCurrentLocation} from './action-creators/filter';
import FilterContainer from './containers/FilterContainer';

function onEnterCard(){

	store.dispatch(getRestaurants());

};

function onEnterFilter(){

	store.dispatch(getCurrentLocation());

};

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path='/' component={LoginContainer} />
        	<Route path='/cards' component={CardBrowseContainer} onEnter={onEnterCard}/>
        	<Route path='/filter' component={FilterContainer} onEnter={onEnterFilter}/>

		</Router>
	</Provider>,
	document.getElementById('main')
);