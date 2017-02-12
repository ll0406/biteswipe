import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Switch,
  ListView,
  TouchableHighlight
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import styles from './styles';

class AdditionalCategories extends Component {
  constructor(props){
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this.selectOrDeselectCategory = this.selectOrDeselectCategory.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const chosenCategories = props.temporaryCategories || props.chosenCategories;

    const categorySwitchStates = {};    
    chosenCategories.forEach((category) => {
       categorySwitchStates[category] = true;
    });

    const categories = props.categories.list.map(category => category.alias);
    
    this.state = {
      chosenCategories,
      ds,
      dataSource: ds.cloneWithRows(categories),
      categorySwitchStates,
      categories
    };

  }

  componentWillReceiveProps(newProps){
    // receive master list of categories
    if(newProps.categories){
      const categories = newProps.categories.list.map(category => category.alias);
      const dataSource = this.state.ds.cloneWithRows(categories);
      this.setState({categories, dataSource});
    };

    if(newProps.temporaryCategories){
     const categorySwitchStates = {};    
     newProps.temporaryCategories.forEach((category) => {
       categorySwitchStates[category] = true; 
     })

     const dataSource = this.state.ds.cloneWithRows(this.state.categories.slice());
     this.setState({categorySwitchStates, dataSource});
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

    const dataSource = this.state.ds.cloneWithRows(this.state.categories.slice());

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

  render(){
    return(
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={(secId, rowId) => <View key={rowId} style={styles.separator}/>}
          enableEmptySections
        />
      </View>
    );
  }
}

export default AdditionalCategories;
