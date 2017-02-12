import React, {Component} from 'react';

import {
  Text,
  Linking
} from 'react-native';

import { View } from 'native-base';

import { styles } from './styles';

export default class Info extends Component {
  render() {
    return (
      <View style={styles.tab}>
        <Text>
          {
            this.props.restaurant.categories && this.props.restaurant.categories.map( (category, index) => {
              return (
                <Text key={index}>{category.title} </Text>
              )
            })
          }
        </Text>
        <Text>{this.props.restaurant.is_closed ? 'Closed now' : 'Open now'}</Text>
        <Text><Text style={styles.tabTitle}>Rating: </Text> {this.props.restaurant.rating}</Text>
        <Text><Text style={styles.tabTitle}>Price: </Text> {this.props.restaurant.price}</Text>
        <Text><Text style={styles.tabTitle}>Phone: </Text> {this.props.restaurant.display_phone}</Text>
        <Text><Text style={styles.tabTitle}>Address: </Text>
          {this.props.restaurant.location && this.props.restaurant.location.display_address.map( (address, index) => {
              return (
                <Text key={index}>{address} </Text>
              )
            })
          }
        </Text>
        <Text style={styles.link} onPress={() => Linking.openURL(this.props.restaurant.url)}>
          {this.props.restaurant.url.substring(0, 50) + '...'}
        </Text>
      </View>
    );
  };
};
