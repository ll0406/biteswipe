import React, {Component} from 'react';
import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ResultsList from '../ResultsList';
import ResultsMap from '../ResultsMap';

import styles from './styles';

export default class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			map: false
		};
		this.onPress = this.onPress.bind(this);
	}

	shouldComponentUpdate(newProps, newState) {
		if(newProps.isSelected) return true;
		return false;
	}

	onPress(boolean) {
		this.setState({
			map: boolean
		});
	}

	render() {

		const location = this.props.location;
		const restaurants = this.props.restaurants;

		if(this.state.map) {
			return (
				<View style={styles.container}>
					<ResultsMap location={location} restaurants={restaurants}/>
					<ActionButton 
						buttonColor="#3498db"
						icon={<Icon name="list" size={30} color="white"/>}
						onPress={() => this.onPress(false)}
						/>
				</View>
				);
		} else {
			return (
				<View style={styles.container}>
					<ResultsList restaurants={restaurants}/>
					<ActionButton 
						buttonColor="#3498db"
						icon={<Icon name="map" size={30} color="white"/>}
						onPress={() => this.onPress(true)}
						/>
				</View>
				);
		};
	}
};
