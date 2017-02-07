import React, {Component} from 'react';
import {View, ListView, Text, Image, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import {Card, CardItem} from 'native-base';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

export default class ResultsList extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged});
		this.state = {
		  dataSource: ds.cloneWithRows(props.restaurants)
		};
		this._deleteRow = this._deleteRow.bind(this);
	}

	componentWillReceiveProps(newProps) {
	  if(newProps.restaurants) {
	    this.setState({
	      dataSource: this.state.dataSource.cloneWithRows(newProps.restaurants)
	    });
	  };
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
		return(
			<View style={{flex: 1}}>
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
	        					<TouchableOpacity onPress={() => Actions.detailView({restaurant: restaurant})}>        					
		        					<Image style={styles.image} source={{ uri: restaurant.image_url }}>
		        						<View style={styles.textContainer}>
		        							<Text style={styles.name}>{restaurant.name}</Text>
		        							<Text style={styles.address}>{restaurant.location.address1}</Text>
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
	}
};
