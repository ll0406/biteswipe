import React, {Component} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';

export default class ResultsMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			region: {}
		};
		this._onRegionChangeComplete = this._onRegionChangeComplete.bind(this);
	}

	componentDidMount() {
		const markers = this.props.restaurants.map((restaurant, index) => `Marker${index}`);
		setTimeout(() => {
			this.map.fitToSuppliedMarkers(markers, false);
		}, 250);
	}	

	componentWillReceiveProps(newProps) {
		if(newProps.restaurants) {
			const markers = newProps.restaurants.map((restaurant, index) => `Marker${index}`);
			setTimeout(() => {
				this.map.fitToSuppliedMarkers(markers, false);
			}, 250);
		}
	}

	render() {
		return (
			<View style ={styles.container}>
			  <MapView
			  	ref={ref => this.map = ref}
			    style={styles.map}
			    region={{
			      latitude: this.props.location.latitude,
			      longitude: this.props.location.longitude,
			      latitudeDelta: 0.01,
			      longitudeDelta: 0.01
			    }}>
			    {
			    	this.props.restaurants.map((restaurant, index) => 
			    		<MapView.Marker
			    			key={index}
			    			identifier={`Marker${index}`}
			    			coordinate={restaurant.coordinates}
			    		/>)
			    }
			  </MapView>
			</View>
			);
	}
};