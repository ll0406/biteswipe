import React, {Component} from 'react';

import store from '../../store';

import {
  View,
  Image,
  TextInput,
  Text,
  Button
} from 'react-native';

export default class Filter extends Component {

	constructor(props){
	  super(props);

	  this.updateFilterOption = this.updateFilterOption.bind(this);
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
			<View>
				<Text>BiteSwipe Filter Options:</Text>

         <Button title="Update" onPress={this.updateFilterOption}/>

			</View>
		);
	};
};
