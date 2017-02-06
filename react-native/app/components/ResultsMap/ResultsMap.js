import React, {Component} from 'react';
import {View, Button} from 'react-native';
import MapView from 'react-native-maps';

import styles from './styles';

export default class ResultsMap extends Component {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		const markers = this.props.restaurants.map((restaurant, index) => `Marker${index}`);
		this.map.fitToSuppliedMarkers(markers, false);
	}

	render() {
		return (
			<View style ={styles.container}>
				<Button title="press this" onPress={this.onPress}/>
			  <MapView
			  	ref={ref => this.map = ref}
			    style={styles.map}
			    region={{
			      latitude: this.props.location.latitude || 37.422,
			      longitude: this.props.location.longitude || -122.084,
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