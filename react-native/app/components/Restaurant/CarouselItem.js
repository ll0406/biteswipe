import React from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import { styles } from './styles';

const CarouselItem = (props) => {

  return(
    <View style={styles.container}>
      <Image
        source={{uri: props.image}}
        style={styles.cardImage}>
      </Image>
    </View>
    );
};

export default CarouselItem;

