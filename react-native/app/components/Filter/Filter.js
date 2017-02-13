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
	  this.goToCategories = this.goToCategories.bind(this);

	  let radius = props.settings.temporaryRadius || props.settings.radius;
	  radius = this.convertMetersToMiles(radius);

	  let priceRange = props.settings.temporaryPriceRange || props.settings.priceRange;
	  // stored as array of indexes -> convert to as array of booleans
	  priceRange = this.convertPriceRangeToBooleans(priceRange);

	  this.state = {
	  	radius, 
	  	priceRange,
	  	updating: false
	  };
	};

	componentWillReceiveProps(nextProps){
		if(nextProps.temporaryRadius) {
			const radius = this.convertMetersToMiles(nextProps.temporaryRadius);
			this.setState({
				radius: radius
			});
		};
		if(nextProps.temporaryPriceRange) {
			const priceRange = this.convertPriceRangeToBooleans(nextProps.temporaryPriceRange);
			this.setState({
				priceRange
			});
		};
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
		const priceRange = this.convertPriceRangeToIndexes(this.state.priceRange);
		const radius = this.convertMilesToMeters(this.state.radius);

    Promise.all([
       this.props.getCurrentLocation(),
       this.props.updateSearchSettings(priceRange, radius, chosenCategories)
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
    	if(!restaurants.length) Alert.alert('', 'No Restaurants Found');
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

	convertPriceRangeToIndexes(priceRange) {
		// priceRange = [true, false, true, true] => [1, 3, 4]
		let convertedPriceRange = [];
		priceRange.forEach((bool, index) => {
			// shift index over by 1
			if(bool) convertedPriceRange.push(index + 1);
		});

		// all deselected === selected
		if(!convertedPriceRange.length) convertedPriceRange = [1, 2, 3, 4];
		return convertedPriceRange;
	}

	convertPriceRangeToBooleans(priceRange) {
		// priceRange = [1, 2, 3] => [true, true, true, false]
		return [1, 2, 3, 4].map(index => priceRange.indexOf(index) !== -1);
	}

	goToCategories() {
		const radius = this.convertMilesToMeters(this.state.radius);
		const priceRange = this.convertPriceRangeToIndexes(this.state.priceRange);
		this.props.setTemporaryRadius(radius);
		this.props.setTemporaryPriceRange(priceRange);
		Actions.categories();
	}

	render(){

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
				      onPress={this.goToCategories}
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
