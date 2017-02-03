import React from 'react';

import { View, Text, Image } from 'react-native';
import { styles } from './styles';

export const HighlightsBox = props => {

  displayIcons = () => {
    let hasBooze = (category) => {
      return (category.alias === 'bars' || category.alias === 'sportsbars' || category.alias === 'irish_pubs') 
    }

    if ( props.restaurant.categories.some(hasBooze) ) {
      return(<Image source={require('./img/beer_ico.png')} style={styles.highlightsBoxIcon} />);
    }
  }

  formatPrice = () => {
    switch (props.restaurant.price) {
      case '$': 
        return (<View style={styles.priceBox}><Text style={styles.priceBold}>$<Text style={styles.priceLight}>$$$</Text></Text></View>);
      case '$$':
        return (<View style={styles.priceBox}><Text style={styles.priceBold}>$$<Text style={styles.priceLight}>$$</Text></Text></View>);
      case '$$$':
        return (<View style={styles.priceBox}><Text style={styles.priceBold}>$$$<Text style={styles.priceLight}>$</Text></Text></View>);
      case '$$$$':
        return (<View style={styles.priceBox}><Text style={styles.priceBold}>$$$$<Text style={styles.priceLight}></Text></Text></View>);
      default :
        return (<View style={styles.priceBox}><Text>-no data-</Text></View>)
    }

  }



  return (
    <View style={styles.highlightsBox}>
      <View style={styles.iconsBox}>
        {displayIcons()}
      </View>
      {formatPrice()}
      <View style={styles.distanceDot}>
        <Text style={styles.distanceDotText}>3</Text>
        <Text style={styles.distanceDotText}>mi.</Text>
      </View>
    </View>
  )   
}
