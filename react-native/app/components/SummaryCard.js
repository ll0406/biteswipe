import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    flex: 1,
    width: 300,
    height: 300
});

export const SummaryCard = props => {
  
  return (
    <View style={styles}>
      <Text>{props.restaurant.name}</Text>
    </View>
  );

};

