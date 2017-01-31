import React, {Component} from 'react';

// import {
//   View,
//   Image,
//   TextInput,
//   Text,
//   Button
// } from 'react-native';

			/*
			<View>
				<Text>BiteSwipe Filter Options:</Text>
				<Text>Number of Stars:</Text> 
				<TextInput type="range" min="1" max="5" onchange="" />
				<Text>Price:</Text> 
	            <TextInput type="range" min="1" max="4" onchange="" />
	            <Text>Cuisine Types:</Text> 

	             <Text>{this.props.location}</Text>

			</View>*/

export default class Filter extends Component {
	
	constructor(props){
		 super(props);
	};

	


	render(){
    	console.log("filter props?: ", this.props);
		return(
			<div>
				
			</div>
		);
	};		
};

