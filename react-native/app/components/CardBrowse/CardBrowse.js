import React from 'react';
// import {SummaryCard} from './SummaryCard';

import { View, Text } from 'react-native';

export const CardBrowse = props => {
  console.log('cardBrowse props:',props);
  return (
    <View style={{backgroundColor:'green', flex: 1}}>
      {
        (props.list.length > 0) && (
          props.list.map( (restaurant, i) => (
            <Text>Heya!</Text>
          ))
        ) 
      }
    </View>
  )
}
