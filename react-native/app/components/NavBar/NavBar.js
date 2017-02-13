import React from 'react';
import {Toolbar} from 'react-native-material-design';
import {Actions} from 'react-native-router-flux';

const NavBar = props => {

  const navigationState = props.navigationState;
  const current = props.current;

  const open = () => {
    Actions.refresh({ key: navigationState.key, open: value => !value });
  };

  const back = () => {
    Actions.pop();
  };

  let title;
  let icon;
  let onIconPress;

  switch(current.name) {
    case 'swipe':
      title = current.title;
      icon = 'menu';
      onIconPress = open;
      break;
    case 'restaurant':
      title = current.selectedRestaurant.name || 'No restaurant selected';
      icon = 'keyboard-backspace';
      onIconPress = back;
      break;
    default:
      title = current.title;
      icon = 'keyboard-backspace';
      onIconPress = back;
      break;
  };

  const actions = props.tab === 1 ? [{ icon: 'delete', onPress: props.clearResults}] : [];

  return (
  	<Toolbar
  	    title={title}
  	    icon={icon}
  	    onIconPress={onIconPress}
        actions={actions}
        rightIconStyle={{
            marginRight: 20
        }}
  	/>
  );
};

export default NavBar;