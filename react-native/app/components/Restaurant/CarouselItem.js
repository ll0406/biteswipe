import React from 'react';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';

const CarouselItem = (props) => {

  return(
    <View style={styles.container}>
      <Image
        source={{uri: props.image}}
        style={styles.cardImage}>
        <LinearGradient
          colors={['transparent', '#777']}
          start={{x:0, y:.8}}
          style={styles.cardImage} />
      </Image>
    </View>
    );
};

export default CarouselItem;

