import React, {Component} from 'react';
import store from '../../store';

import {
  View,
  Image,
  TextInput,
  Text,
  Slider,
  TouchableOpacity,
  Alert
} from 'react-native';

import { List, ListItem, Button } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

import styles from './styles';

import Updating from './Updating';

export default class Filter extends Component {

	constructor(props){
	  super(props);

	  this.updateFilterOption = this.updateFilterOption.bind(this);
	  this.onDollarAmountPress = this.onDollarAmountPress.bind(this);

	  const priceRange = [1, 2, 3, 4].map(index => props.settings.priceRange.indexOf(index) !== -1);

	  this.state = {
	  	radius: this.convertMetersToMiles(props.settings.radius), 
	  	priceRange,
	  	updating: false
	  };
	};

	componentWillUnmount(){
		// clear temporary categories 
		this.props.setTemporaryCategories(null);
	}

	onDollarAmountPress(value){
		let priceRange = this.state.priceRange;
		priceRange[value] = !priceRange[value];

	  this.setState({
	  	priceRange
	  });
	}

	updateFilterOption(){
		// prevent user from making changes during update
		this.setState({
			updating: true
		});

		// if tempCategories are null then use same categories found in settings
		const chosenCategories = this.props.temporaryCategories || this.props.chosenCategories;
		// priceRange = [1, 2, 3]
		let priceRange = [];
		this.state.priceRange.forEach((bool, index) => {
			// shift index over by 1
			if(bool) priceRange.push(index + 1);
		});

		// all deselected === selected
		if(!priceRange.length) priceRange = [1, 2, 3, 4];

    Promise.all([
       this.props.getCurrentLocation(),
       this.props.updateSearchSettings(priceRange, this.convertMilesToMeters(this.state.radius), chosenCategories)
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
    	if(!restaurants.length) Alert.alert('', 'No restaurants found');
    	else {
    		this.props.setAvailable(true);
    		Actions.pop();
    	};
    })
    .catch(console.log);
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

		const goToCategories = () => Actions.categories();
		const priceRange = this.state.priceRange;

		if(this.state.updating) {
			return (
				<Updating/>
				);
		} else {
			return(
				<View style={styles.container}>
			    <List containerStyle={styles.listContainer}>
				    <ListItem
				      key={0}
				      title="Restaurant Categories"
				      onPress={goToCategories}
				    />
			    </List>
			    <View>
		        <Text style={styles.radiusText}>
		        	Radius: {this.state.radius} miles
		        </Text>
		        <Slider
		          step={5}
		          minimumValue={5}
		      		maximumValue={25}
		      		value={this.state.radius}
		          {...this.state}
		          onSlidingComplete={(value) => this.setState({ radius: value })} />
			    </View>
			    <View>
						<Text style={styles.priceText}>
						  Price Range:
						</Text>
						<View style={styles.buttonsContainer}> 
							<TouchableOpacity onPress={() => this.onDollarAmountPress(0)}>
								<View style={priceRange[0] ? styles.buttonEnabled : styles.buttonDisabled}>
									<Text style={styles.buttonText}>$</Text>
								</View>
						  </TouchableOpacity>
							<TouchableOpacity onPress={() => this.onDollarAmountPress(1)}>
								<View style={priceRange[1] ? styles.buttonEnabled : styles.buttonDisabled}>
									<Text style={styles.buttonText}>$$</Text>
								</View>
						  </TouchableOpacity>
					  	<TouchableOpacity onPress={() => this.onDollarAmountPress(2)}>
					  		<View style={priceRange[2] ? styles.buttonEnabled : styles.buttonDisabled}>
					  			<Text style={styles.buttonText}>$$$</Text>
					  		</View>
					    </TouchableOpacity>
					  	<TouchableOpacity onPress={() => this.onDollarAmountPress(3)}>
					  		<View style={priceRange[3] ? styles.buttonEnabled : styles.buttonDisabled}>
					  			<Text style={styles.buttonText}>$$$$</Text>
					  		</View>
					    </TouchableOpacity>
						</View>
			    </View>
	        <View style={styles.updateContainer}>
		        <Button
		          raised
		          backgroundColor={'#65C2E3'}
		          icon={{name: 'cached'}}
		          title='Update'
		          onPress={this.updateFilterOption}
		          />
	        </View>
				</View>
			);
		};
	}
};
