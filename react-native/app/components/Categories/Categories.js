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

import styles from './styles'

import Loading from '../Loading';

class Categories extends Component {
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this.selectOrDeselectCategory = this.selectOrDeselectCategory.bind(this);
 
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    const chosenCategories = props.temporaryCategories || props.chosenCategories;
    
    const categorySwitchStates = {};
    chosenCategories.forEach((category) => {
       categorySwitchStates[category] = true; 
    });
    
    this.state = {
      chosenCategories,
      ds, 
      dataSource: ds.cloneWithRows(chosenCategories.slice()),
      categorySwitchStates,
      loading: !this.props.categories.list || !this.props.categories.map
    };

  }

  componentDidMount(){
    // skip if all categories list and map exist
    if(this.props.categories.list && this.props.categories.map) return;

    this.props.getCategories()
    .then(() => {
      this.setState({
        loading: false
      });
    })
    .catch(console.log);
  }

  componentWillReceiveProps(newProps){
    if(newProps.temporaryCategories){
      const chosenCategories = newProps.temporaryCategories.slice();

      const categorySwitchStates = {};    
      chosenCategories.forEach((category) => {
       categorySwitchStates[category] = true; 
      });

      const dataSource = this.state.ds.cloneWithRows(chosenCategories);
      this.setState({chosenCategories, categorySwitchStates, dataSource});
    };
  }

  componentWillUnmount(){
    const categorySwitchStates = this.state.categorySwitchStates;
    const categories = [];

    Object.keys(categorySwitchStates).forEach((category) => {
      if(categorySwitchStates[category]) categories.push(category);
    });

    this.props.setTemporaryCategories(categories);
  }

  selectOrDeselectCategory(value, rowData){
    let categorySwitchStates = this.state.categorySwitchStates;

    categorySwitchStates[rowData] = value;

    const dataSource = this.state.ds.cloneWithRows(this.state.chosenCategories.slice());

    this.setState({categorySwitchStates, dataSource});
  };

  _renderRow(rowData){
    const title = this.props.categories.map[rowData];
    const onSwitch = this.state.categorySwitchStates[rowData] ? this.state.categorySwitchStates[rowData] : false;
    return(
      <View style={styles.row}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
              onValueChange={(value) => {
                this.selectOrDeselectCategory(value, rowData);
              }}
              value={onSwitch} 
          />
        </View>
      </View>
    );
  }

  render() {
    const goToAdditionalCategories = () => Actions.additionalcategories();
    if(this.state.loading) {
      return (
        <Loading/>
        );
    } else {
      return (
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            renderSeparator={(secId, rowId) => <View key={rowId} style={styles.separator}/>}
            enableEmptySections
          />
          {
            this.state.dataSource.getRowCount() === 0 && <ListItem title={"All Categories Selected"} hideChevron/>
          }
          <ListItem
            title={"More..."}
            onPress={goToAdditionalCategories}
          />
        </View>
      );
    }
  }
};

export default Categories;
