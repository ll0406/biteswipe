import React, {Component} from 'react';

import store from '../../store';

import {
  View,
  Image,
  TextInput,
  Text,
  Button
} from 'react-native';

import {getRestaurants} from '../../action-creators/restaurants';
import {getCurrentLocation} from '../../action-creators/filter';

export default class Filter extends Component {
	
	constructor(props){
	  super(props);
	  this.state = {
	  	stars : 5, 
	  	priceRange : 3
	  }

	  this.updateFilterOption = this.updateFilterOption.bind(this);

	};

	componentDidMount(){
	
		store.dispatch(getCurrentLocation());
	};
    
    //move method to connect 
	updateFilterOption(){	
		console.log("this DOT props: ", this.props.location.latitude);	
    store.dispatch(getRestaurants(this.props.location.latitude, this.props.location.longitude, 8047, 3, false, "bars,french"));
	}

	render(){

		return(
			<View>
				<Text>BiteSwipe Filter Options:</Text>
				
				<Text>Number of Stars:</Text> 
				<TextInput
				 onChangeText={(stars) => this.setStars(stars)}
				/>
				
				<Text>Price:</Text> 
	            <TextInput 
	             onChangeText={(priceRange) => this.setPriceRange(priceRange)}
	            />
	            <Text>Cuisine Types:</Text> 


          		<Button title="Update" onPress={this.updateFilterOption}/>

			</View>
		);
	};		
};




