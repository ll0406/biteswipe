import React from 'react';
import {Toolbar} from 'react-native-material-design';
import {Actions} from 'react-native-router-flux';

const NavBar = props => {

	const navigationState = props.navigationState;
  
  return (
  	<Toolbar
  	    title="BiteSwipe"
  	    icon="menu"
  	    onIconPress={() => {
  	    	Actions.refresh({ key: navigationState.key, open: true })
  	    }}
  	/>
  );
};

export default NavBar;