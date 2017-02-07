import React from 'react';

import { View, Text, Image, StyleSheet, Button, Linking } from 'react-native';

export const RatingStars = (props) => {

  var starImages = [
    require('./img/stars/31x31_0.png'),
    require('./img/stars/31x31_1.png'),
    require('./img/stars/31x31_2.png'),
    require('./img/stars/31x31_3.png'),
    require('./img/stars/31x31_4.png'),
    require('./img/stars/31x31_5.png'),
    require('./img/stars/31x31_1_5.png'),
    require('./img/stars/31x31_2_5.png'),
    require('./img/stars/31x31_3_5.png'),
    require('./img/stars/31x31_4_5.png'),
  ]


  let images = [ ], 
    tempScore = props.rating, 
    imgIdx = Math.floor(props.rating);

  for (let i = 0; i < 5; i++){
    if (tempScore >= 1) {
      images[i] = imgIdx;
      tempScore--;
    } else if (tempScore === .5){
      images[i] = imgIdx+5;
      tempScore -= .5;
    } else {
      images[i] = 0;
    }
  }

  return (
    <View style={styles.box}>
      {
        images.map( (imgIdx, i) => {
          return (
            <Image
              source={starImages[imgIdx]}
              key={i}
              style={styles.starImg} />
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({ 
  box: {
    padding: 5,
    flexDirection:'row',
    backgroundColor: 'lightgray',
  },
  starImg: {
    width: 25, 
    height:25, 
    margin: 1
  } 
});
