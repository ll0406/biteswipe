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
     
	  this.updateFilterOption = this.updateFilterOption.bind(this);
	  this.onDollarAmountPress = this.onDollarAmountPress.bind(this);
	  this.logChange = this.logChange.bind(this);
	};

    state = {
	  radius: 5, 
	  priceRange: [],
	  categories: ['bars']
	};

	componentDidMount(){
		this.props.getCurrentLocation();
		this.props.getSearchSettings();
	};

	onDollarAmountPress(value){
		let indexLocation = this.state.priceRange.indexOf(value);
	    indexLocation === -1 ? this.state.priceRange.push(value) : this.state.priceRange.splice(indexLocation, 1);
	    console.log("indexLocation: ", indexLocation);
		console.log("hamster dayz: ", this.state.priceRange);
	}

	updateFilterOption(){

	  //TRANSITION THIS STUFF TO SWIPEVIEW?

	  this.props.receiveSearchSettings(this.state);

	  this.props.addSearchSettings(this.state.priceRange,this.state.radius,this.state.categories);

	 // this.props.getRestaurants();
	 //  let gen = this.props.restaurantGenerator(this.props.getRestaurants);

		// console.log("J ", gen.next()); 
	 //    console.log("o", gen.next()); 
	 //    console.log("E", gen.next()); 
		 
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
			    <Text style={styles.text} >
		          Price Range:
		        </Text>
			    <View style={styles.buttonContainer}>
				    <Button
			         title="$"
			         color="#841584"
			         accessibilityLabel="$"
			         onPress={() => this.onDollarAmountPress(1)}
			       />
				   <Button
			         title="$$"
			         color="#841584"
			         accessibilityLabel="$$"
			         onPress={() => this.onDollarAmountPress(2)}
			       />
			       <Button
			         title="$$$"
			         color="#841584"
			         accessibilityLabel="$$$"
			         onPress={() => this.onDollarAmountPress(3)}
			       />
			       <Button
			         title="$$$$"
			         color="#841584"
			         accessibilityLabel="$$$$"
			         onPress={() => this.onDollarAmountPress(4)}
			       />
                </View>
	            <Button
	                onPress={this.updateFilterOption}
	                title="Update"
	                accessibilityLabel="Updated!"
	            />
			</View>
		);
	};
};