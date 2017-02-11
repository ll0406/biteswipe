import React, {Component} from 'react';
import store from '../../store';

import {
  View,
  Image,
  TextInput,
  Text,
  Button,
  Slider,
  StyleSheet,
  TouchableOpacity,
  ListView
} from 'react-native';

//import { Button } from 'react-native-elements'

import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import Autocomplete from 'react-native-autocomplete-input';
import CheckBox from 'react-native-checkbox';

import styles from './styles';

export default class Filter extends Component {

	constructor(props){
	  super(props);

	  this.updateFilterOption = this.updateFilterOption.bind(this);
	  this.onDollarAmountPress = this.onDollarAmountPress.bind(this);
	  this.renderRow = this.renderRow.bind(this);
	  this.processRadius = this.processRadius.bind(this);

	  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	  this.state = {
	  	dataSource : ds.cloneWithRows([
		  {
		    name: 'Restaurant Categories'
		  }
	  	]),
		radius: this.props.settings.radius, 
		priceRange: this.props.settings.priceRange
	  };
	};

	onDollarAmountPress(value){
		let indexLocation = this.state.priceRange.indexOf(value);
	    indexLocation === -1 ? this.state.priceRange.push(value) : this.state.priceRange.splice(indexLocation, 1);
	    console.log("indexLocation is: ", indexLocation);
		console.log("princeRange is: ", this.state.priceRange);
	}

	updateFilterOption(){
	    Promise.all([
	       //this.props.getCurrentLocation(),
	       this.props.addSearchSettings(this.state.priceRange, this.processRadius(this.state.radius))
	     ])
	    .then(() => {
	       this.props.clearSwipeCounter();
	       this.props.clearRestaurants();
	       return this.props.getRestaurants();
	    })
	    .then(() => {
	    	Actions.pop();
	    })
	    .catch(console.log);	  
	}

	renderRow (rowData, sectionID) {
	  const goToCategories = () => Actions.categories({ addCategory : this.addCategory, removeCategory : this.removeCategory});	  
	  return (
	  	<View>
		    <ListItem
		      key={sectionID}
		      title={rowData.name}
		      subtitle={rowData.subtitle}
		      onPress={goToCategories}
		    />
		</View>
	  )   	
	}


	processRadius(radius) {

		//need a default radius if radius comes in blank!

		const conversionChart = {
			5 : '8047',
			10 : '16093',
			15 : '24140',
			20 : '32187',
			25 : '40000' //Yelp indicates the 40K meters is the max
		};

		console.log("converison!!! ", conversionChart[radius]);
		
		return conversionChart[radius];
	}

	render(){

		return(
			<View style={styles.container}>

				<Text>BiteSwipe Filter Options:</Text>
                <Text>Add Restaurant Category:</Text>
			    <List>
			      <ListView
			        renderRow={this.renderRow}
			        dataSource={this.state.dataSource}
			      />
			    </List>
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
			    <Text style={styles.text}>
		          Price Range:
		        </Text>
			    <View style={styles.buttonContainer}> 
				    <Button
			         large				    
			         title="$"
			         color="#841584"
			         accessibilityLabel="$"
			         onPress={() => this.onDollarAmountPress(1)}
			       />
				   <Button
			         large				   
			         title="$$"
			         color="#841584"
			         accessibilityLabel="$$"
			         onPress={() => this.onDollarAmountPress(2)}
			       />
			       <Button
			         large			       
			         title="$$$"
			         color="#841584"
			         accessibilityLabel="$$$"
			         onPress={() => this.onDollarAmountPress(3)}
			       />
			       <Button
			         large
			         title="$$$$"
			         color="#841584"
			         accessibilityLabel="$$$$"
			         onPress={() => this.onDollarAmountPress(4)}
			       />
                </View>
	            <Button
	                large
	            	backgroundColor={'#65C2E3'}
	            	icon={{name: 'cached'}}
	                onPress={this.updateFilterOption}
	                title="Update"
	                accessibilityLabel="Updated!"
	            />
			</View>
		);
	};
};
