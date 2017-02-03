import React from 'react';

import { View, Text, Image } from 'react-native';

export const RatingStars = (props) => {

  let imageUrl = `./img/stars/14x14_${Math.floor(props.rating)}.png` 

  console.log(imageUrl);


  return (
    <View style={{backgroundColor: 'pink'}}>
      <Image source={{uri: '/img/stars/14x14_5.png'}} style={{width:50, height:50}}></Image>
    </View>
  )
}