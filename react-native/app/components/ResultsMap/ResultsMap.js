import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import TimerMixin from 'react-timer-mixin';
import {Actions} from 'react-native-router-flux';

import styles from './styles';

const ResultsMap = React.createClass({
	mixins: [TimerMixin],

	getInitialState() {
	  return {
			region: {}
		};
	},

	componentDidMount() {
		const markers = this.props.restaurants.map((restaurant, index) => `Marker${index}`);
		// dirty hax
		this.setTimeout(() => {
			this.map.fitToSuppliedMarkers(markers, false);
		}, 250);
	},	

	componentWillReceiveProps(newProps) {
		if(newProps.restaurants) {
			const markers = newProps.restaurants.map((restaurant, index) => `Marker${index}`);
			this.setTimeout(() => {
				this.map.fitToSuppliedMarkers(markers, false);
			}, 250);
		}
	},

	render() {

		const goToRestaurant = restaurant => Actions.restaurant({ selectedRestaurant: restaurant }); 

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
			    			title={restaurant.name}
			    			onCalloutPress={() => goToRestaurant(restaurant)}
			    		/>)
			    }
			  </MapView>
			</View>
			);
	}
});

export default ResultsMap;