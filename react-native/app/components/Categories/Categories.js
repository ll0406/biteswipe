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
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.settings.categories),
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
    };

    this.props.getCategories();

  }

  selectOrDeselectCategory(value, rowData){
     console.log("select/deselect: value ", value);     
     console.log("select/deselect: rowData ", rowData);
     
     if(value){
      this.props.addCategory(rowData);
     } 
     else {
      this.props.removeCategory(rowData);
     }
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
              value={this.props.settings.categories.indexOf(rowData) !== -1} 

          />
        </View>
      )
  };


  render() {

    const goToDetailView = () => Actions.additionalcategories();
    return (
      <View>
        <Text>Current Restaurant Categories</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
        <ListItem
          title={"More..."}
          onPress={goToDetailView}
        />
      </View>
    );

  }
}


export default Categories;