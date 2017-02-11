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
      categorySwitchStates 
    };

  }

  componentWillReceiveProps(newProps){
    if(newProps.temporaryCategories){
      const chosenCategories = newProps.temporaryCategories.slice();
      const categorySwitchStates = {};    
      newProps.temporaryCategories.forEach((category) => {
       categorySwitchStates[category] = true; 
      });

      const dataSource = this.state.ds.cloneWithRows(chosenCategories);
      this.setState({categorySwitchStates, dataSource});
    };
  }

  componentWillUnmount(){
    const categorySwitchStates = this.state.categorySwitchStates;
    const chosenCategories = [];

    Object.keys(categorySwitchStates).forEach((category) => {
      if(categorySwitchStates[category]) chosenCategories.push(category);
    });

    this.props.setTemporaryCategories(chosenCategories);
  }

  selectOrDeselectCategory(value, rowData){
     let categorySwitchStates = this.state.categorySwitchStates;

     categorySwitchStates[rowData] = value;

     const dataSource = this.state.ds.cloneWithRows(this.state.chosenCategories.slice());

     this.setState({categorySwitchStates, dataSource});
  };

  _renderRow(rowData){
      return(
        <View>
          <Text>{rowData}</Text>
          <Switch
              onValueChange={(value) => {
                this.selectOrDeselectCategory(value, rowData);
              }}
              style={{marginBottom: 10}}
              value={this.state.categorySwitchStates[rowData]} 
          />
        </View>
      )
  };

  render() {
    const goToAdditionalCategories = () => Actions.additionalcategories();
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        <ListItem
          title={"More..."}
          onPress={goToAdditionalCategories}
        />
      </View>
    );
  }
};

export default Categories;
