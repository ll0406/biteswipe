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

export default class Filter extends Component {

	constructor(props){
	  super(props);


	  this.updateFilterOption = this.updateFilterOption.bind(this);
	};

    state = {
	  radius: 5
	};

	componentDidMount(){
		this.props.getCurrentLocation();
		this.props.getSearchSettings();
	};

	updateFilterOption(){

    this.props.getRestaurants()
	}

	render(){
		return(
			<View  style={styles.container}>
				<Text>BiteSwipe Filter Options:</Text>
		        <Text style={styles.text} >
		        	Radius: {this.state.radius}
		        </Text>
		        <Slider
		          step={5}
		          minimumValue={5}
          		  maximumValue={25}
          		  value={5}
		          {...this.state}
		          onSlidingComplete={(value) => this.setState({ radius: value })} />
			</View>
		);
	};
};
