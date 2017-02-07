import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Switch,
  ListView
} from 'react-native';

import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import styles from './styles';


// const API = 'https://swapi.co/api';
// const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];


class AdditionalCategories extends Component {



  static renderSelected(category) {
   console.log("in render selected");
  
   const { name, alias } = category;

    return (
      <View>
        <Text style={styles.directorText}>{name}</Text>
        <Text style={styles.openingText}>(({alias}))</Text>
      </View>
    );
  }

  static renderAll(categories) {

    console.log("in render all: ", categories);

    return categories.map(function(category, index){
      return (
        <View key={index}>
          <Text style={styles.openingText}>(({category.alias}))</Text>
          <Switch
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              style={{marginBottom: 10}}
              value={this.state.falseSwitchIsOn} 
          />
        </View>
      );  
    }); 

  }


  constructor(props) {
    super(props);


  //  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
     // dataSource: ds.cloneWithRows(this.props.settings.categories),
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      query: '',
      categories: []
    };

  }

  componentWillMount() {
    //this.props.getAdditionalCategories();
    
    //fetch(`${API}/films/`).then(res => res.json()).then((json) => {
    //const { results: categories } = json;
    const categories = [{
      name: 'newamerican',
      alias: 'hipster'
    },
    {
      name: 'mexican',
      alias: 'mexican'
    },
    {
      name: 'french',
      alias: 'french'
    }]


    this.setState({ categories });
    //});

    console.log("state mounted?>> ", this.state);
  }

  findAdditionalCategories(query) {
    
    const { categories } = this.state;
    console.log("state please?: ", this.state);

    if (query === '') {
      console.log("finder!: ", categories);
      return categories;
    }

    const regex = new RegExp(`${query.trim()}`, 'i');
    return categories.filter(category => category.name.search(regex) >= 0);

  }

  render() {

    const { query } = this.state;
    const categories = this.findAdditionalCategories(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

  //  const goToDetailView = () => Actions.insertcategories();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={categories.length === 1 && comp(query, categories[0].name) ? [] : categories}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Search Restaurant Category"
          renderItem={({ name, alias }) => (
            <TouchableOpacity onPress={() => this.setState({ query: name })}>
              <Text style={styles.itemText}>
                {name} ({alias})
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {
            categories.length > 0 ? (
              AdditionalCategories.renderAll(categories)
            ) : (   
             AdditionalCategories.renderSelected(categories[0])   
          )}
        </View>
      </View>
    );

  }
}


export default AdditionalCategories;