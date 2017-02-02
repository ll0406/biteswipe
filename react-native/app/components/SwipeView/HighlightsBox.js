import React from 'react';

import { View, Text } from 'react-native';
import { styles } from './styles';

export const HighlightsBox = props => {

  console.log(props);

  return (
    <View style={styles.highlightsBox}>
      <Text>HighlightsBox</Text>
    </View>
  )   
}
