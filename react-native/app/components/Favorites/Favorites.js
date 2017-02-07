import React, {Component} from 'react';
import store from '../../store';

import {
  View,
  Image,
  TextInput,
  Text,
  Button, 
  Slider,
  StyleSheet
} from 'react-native';

import CheckBox from 'react-native-checkbox';
import styles from './styles';

export default class Favorites extends Component {

	constructor(props){

	  super(props);
     
	};

    state = {
    	selected: -1 //current favorite opened
	};

	componentDidMount(){
		this.props.getFavorites();
	};
	
	render(){
		return(
			<View  style={styles.container}>
				<Text>Favorites</Text>
				
			</View>
		);
	};
};