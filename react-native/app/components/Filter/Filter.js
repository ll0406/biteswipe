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

import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

import styles from './styles';

import Updating from './Updating';

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
	  	radius: props.settings.radius, 
	  	priceRange: props.settings.priceRange,
	  	updating: false
	  };
	};

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
       this.props.addSearchSettings(this.state.priceRange, this.processRadius(this.state.radius))
     ])
    .then(() => {
       this.props.clearSwipeCounter();
       this.props.clearRestaurants();
       return this.props.getRestaurants();
    })
    .then(() => {
    	this.setState({
    		updating: false
    	});
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
		return conversionChart[radius];
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
			         style={priceRange.indexOf(1) !== -1 ? styles.buttonEnabled : styles.buttonDisabled}
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
