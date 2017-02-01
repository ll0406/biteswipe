import React from 'react';

// import { styles } from './styles';
import { getTheme } from 'react-native-material-kit';

import { View, Text } from 'react-native';


export const NavBar = props => {
  console.log(getTheme());

  return (
    <View>
        <Text> Nav bar lol </Text>
    </View>
  );
}
