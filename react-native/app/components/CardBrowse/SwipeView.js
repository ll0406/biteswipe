import React from 'react';
import { SummaryCard } from './SummaryCard';

import { View, Text } from 'react-native';

export const SwipeView = props => {
  return (
    <View style={{backgroundColor:'#FAFAFA', flex: 1}}>
      {
        (props.list.length > 0) && (
          props.list.map( (restaurant, i) => (
            <SummaryCard restaurant={restaurant} key={i} />
          ))
        ) 
      }
    </View>
  )
}
