import React from 'react';
import {View, Image, Text, Dimensions, StyleSheet} from 'react-native';
import { styles } from './styles';

const CarouselItem = (props) => {
  return(
    <View style={styles.container}>
      <Image
        source={{uri: props.image || 'http://www.fillmurray.com/284/196'}}
        style={styles.cardImage}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>{props.name}</Text>
        </View>
      </Image>
    </View>
    );
};

export default CarouselItem;

