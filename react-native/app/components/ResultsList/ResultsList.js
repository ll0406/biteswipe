import React, {Component} from 'react';
import {View, ListView} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import ResultsListItem from './ResultsListItem';

import styles from './styles';

export default class ResultsList extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: this._rowHasChanged});
		this.state = {
		  dataSource: ds.cloneWithRows(props.restaurants)
		};
	}

	componentWillReceiveProps(newProps) {
	  if(newProps.restaurants) {
	    this.setState({
	      dataSource: this.state.dataSource.cloneWithRows(newProps.restaurants)
	    })
	  }
	}

	_rowHasChanged(row1, row2) {
		return row1 !== row2;
	}

	render() {
		return(
			<View style={styles.container}>
				<SwipeListView
					dataSource={this.state.dataSource}
        	renderRow={restaurant => <ResultsListItem restaurant={restaurant} removeFromResults={this.props.removeFromResults}/>}
        	enableEmptySections
        	/>
			</View>
			);
	}
};
