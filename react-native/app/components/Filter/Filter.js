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
	  radius: 5, 
	  priceRange: []
	};

	componentDidMount(){
		this.props.getCurrentLocation();
		this.props.getSearchSettings();
	};

	onOneDollarPress(){
		//new a state toggle checker?!
	}

	onTwoDollarPress(){
		
	}

	onThreeDollarPress(){
		
	}

	onFourDollarPress(){
		
	}

	updateFilterOption(){
	  this.props.addSearchSettings(this.state);
      this.props.getRestaurants();
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
			        <Button
		         onPress={onOneDollarPress}
		         title="$"
		         color="#841584"
		         accessibilityLabel="Ok, Great!"
		       />
			   <Button
		         onPress={onTwoDollarPress}
		         title="$$"
		         color="#841584"
		         accessibilityLabel="Ok, Great!"
		       />
		       <Button
		         onPress={onThreeDollarPress}
		         title="$$$"
		         color="#841584"
		         accessibilityLabel="Ok, Great!"
		       />
		       <Button
		         onPress={onFourDollarPress}
		         title="$$$$"
		         color="#841584"
		         accessibilityLabel="Ok, Great!"
		       />
                <Button
                  onPress={updateFilterOption}
                  title="Update"
                  accessibilityLabel="Updated!"
                />
			</View>
		);
	};
};
