import React, {Component} from 'react';
import {View, ListView, Text, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {Card, CardItem} from 'native-base';
import {Actions} from 'react-native-router-flux';
import EmptyResults from './EmptyResults';

import styles from './styles';

export default class ResultsList extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged});
		const restaurants = this.getObjectValues(props.restaurants);

		this.state = {
		  dataSource: ds.cloneWithRows(restaurants)
		};
		this._deleteRow = this._deleteRow.bind(this);
	}

	componentWillReceiveProps(newProps) {
	  if(newProps.restaurants) {
	  	const restaurants = this.getObjectValues(newProps.restaurants);
	    this.setState({
	      dataSource: this.state.dataSource.cloneWithRows(restaurants)
	    });
	  };
	}

	getObjectValues(object) {
		let values = [];
		for(let key in object) {
			values.push(object[key]);
		}
		return values;
	}

	_rowHasChanged(row1, row2) {
		return row1 !== row2;
	}

	_deleteRow(restaurant, secId, rowId, rowMap) {
	  rowMap[`${secId}${rowId}`].closeRow();
	  this.props.removeFromResults(restaurant);
	}

	render() {
		// weird bug -> deleted items propogate "swiped" status to next item in list
		// fix requires inline SwipeRow as opposed to separate component (rowMap !== null)
		if(!this.state.dataSource.getRowCount()) {
			return(
				<EmptyResults/>
				);
		} else {		
			return(
				<View style={styles.container}>
					<SwipeListView
						dataSource={this.state.dataSource}
						enableEmptySections
	        	renderRow={(restaurant, secId, rowId, rowMap) => 
		        		(<SwipeRow rightOpenValue={-120} disableRightSwipe>
		        			<View style={styles.rowBack}>
		        				<View style={styles.rowBackContainer}>
		        					<TouchableOpacity onPress={() => this._deleteRow(restaurant, secId, rowId, rowMap)}>
		        						<Text style={styles.rowBackText}>Delete</Text>
		        					</TouchableOpacity>
		        				</View>
		        			</View>
		        			<Card style={styles.rowFront}>
		        				<CardItem style={styles.cardItem}>
		        					<TouchableOpacity onPress={() => Actions.restaurant({selectedRestaurant: restaurant})} activeOpacity={1}>        					
			        					<Image style={styles.image} source={{ uri: restaurant.image_url }}>
			        						<View style={styles.textContainer}>
			        							<Text style={styles.name}>{restaurant.name}</Text>
			        							<Text style={styles.address}>{restaurant.location.display_address[0]}</Text>
			        							<Text style={styles.address}>{restaurant.location.display_address[1]}</Text>
			        						</View>
			        					</Image>
		        					</TouchableOpacity>
		        				</CardItem>
		        			</Card>
		        		</SwipeRow>)
		        	}
	        	/>
				</View>
				);
		};
	}
};
