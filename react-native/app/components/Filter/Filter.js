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
  ListView,
  Alert
} from 'react-native';

import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

import styles from './styles';

import Updating from './Updating';

export default class Filter extends Component {

	constructor(props){
	  super(props);

	  this.updateFilterOption = this.updateFilterOption.bind(this);
	  this.onDollarAmountPress = this.onDollarAmountPress.bind(this);

	  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	  this.state = {
	  	dataSource : ds.cloneWithRows([
		  {
		    name: 'Restaurant Categories'
		  }
	  	]),
	  	radius: this.convertMetersToMiles(props.settings.radius), 
	  	priceRange: props.settings.priceRange,
	  	updating: false
	  };
	};

	componentWillUnmount(){
		
	}

	onDollarAmountPress(value){
		const priceRange = this.state.priceRange;
		let indexLocation = priceRange.indexOf(value);
	  indexLocation === -1 ? priceRange.push(value) : priceRange.splice(indexLocation, 1);
	  this.setState({
	  	priceRange
	  });
	}

	updateFilterOption(){
		this.setState({
			updating: true
		});

    Promise.all([
       // this.props.getCurrentLocation(),
       this.props.addSearchSettings(this.state.priceRange, this.convertMilesToMeters(this.state.radius))
     ])
    .then(() => {
       this.props.clearSwipeCounter();
       this.props.clearRestaurants();
       return this.props.getRestaurants();
    })
    .then(restaurants => {
    	// clear updating screen
    	this.setState({
    		updating: false
    	});
    	if(!restaurants.length) Alert.alert('Filter Settings', 'No restaurants found')
    	else Actions.pop();
    })
    .catch(console.log);
	}

	renderRow(rowData, sectionID){
	  const goToCategories = () => Actions.categories();	  
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

	convertMetersToMiles(meters){
		const conversionChart = {
			8047 : 5,
			16093 : 10,
			24140 : 15,
			32187 : 20,
			40000 : 25
		};		
		return conversionChart[meters];
	}

	convertMilesToMeters(miles){
		const conversionChart = {
			5 : 8047,
			10 : 16093,
			15 : 24140,
			20 : 32187,
			25 : 40000 //Yelp indicates the 40K meters is the max
		};		
		return conversionChart[miles];
	}

	render(){
		if(this.state.updating) {
			return (
				<Updating/>
				);
		} else {
			return(
				<View style={styles.container}>
			    <List>
			      <ListView
			        renderRow={this.renderRow}
			        dataSource={this.state.dataSource}
			      />
			    </List>
	        <Text style={styles.text}>
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
	}
};
