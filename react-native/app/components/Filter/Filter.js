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
import Autocomplete from 'react-native-autocomplete-input';
import CheckBox from 'react-native-checkbox';
import styles from './styles';

export default class Filter extends Component {

	constructor(props){
	  super(props);
	  this.updateFilterOption = this.updateFilterOption.bind(this);
	  this.onDollarAmountPress = this.onDollarAmountPress.bind(this);
	  this.renderRow = this.renderRow.bind(this);

	  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	  this.state = {
	  	dataSource : ds.cloneWithRows([
		  {
		    name: 'Restaurant Categories'
		  }
	  	])
	  };
	};

    state = {
	  radius: 5, 
	  priceRange: [],
	  categories: ['bars', 'french', 'mexican', 'newamerican'],
	  query : ''
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

	  this.props.addSearchSettings(this.state.priceRange,this.state.radius);

	 /*
		 this.props.getRestaurants();
		 let gen = this.props.restaurantGenerator(this.props.getRestaurants);

		 console.log("J ", gen.next()); 
		 console.log("o", gen.next()); 
		 console.log("E", gen.next()); 
	 */ 

	}


	renderRow (rowData, sectionID) {
	  
	  const goToDetailView = () => Actions.categories({restaurant: this.props.restaurant});
	  
	  return (
	  	<View>
		    <ListItem
		      key={sectionID}
		      title={rowData.name}
		      subtitle={rowData.subtitle}
		      onPress={goToDetailView}
		    />
		</View>
	  )
	}

	// findFilm(query) {
	//     if (query === '') {
	//       return [];
	//     }

	//     const { films } = this.state;
	//     const regex = new RegExp(`${query.trim()}`, 'i');
	//     return films.filter(film => film.title.search(regex) >= 0);
 //    }

          //           <View>
			       //  <Autocomplete
				      //     autoCapitalize="none"
				      //     autoCorrect={false}
				      //     containerStyle={styles.autocompleteContainer}
				      //     data={films.length === 1 && comp(query, films[0].title) ? [] : films}
				      //     defaultValue={query}
				      //     onChangeText={text => this.setState({ query: text })}
				      //     placeholder="Add Restaurant Category:"
				      //     renderItem={({ title, release_date }) => (
				      //       <TouchableOpacity onPress={() => this.setState({ query: title })}>
				      //         <Text style={styles.itemText}>
				      //           {title} ({release_date.split('-')[0]})
				      //         </Text>
				      //       </TouchableOpacity>
				      //     )}
			       //   />
		        // </View>


	render(){


		return(
			<View  style={styles.container}>

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
