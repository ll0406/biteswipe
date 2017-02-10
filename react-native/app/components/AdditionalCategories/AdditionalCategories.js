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

import { List, ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import styles from './styles';


class AdditionalCategories extends Component {

  
  constructor(props){
    super(props);

    
    this._renderRow = this._renderRow.bind(this);
    this.selectOrDeselectCategory = this.selectOrDeselectCategory.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    console.log("this.props.categories: ", this.props.categories);

    const categoryTitles = props.categories.map(function(category, index){
      return category.title;
    });
    
    this.state = {
      dataSource: ds.cloneWithRows(categoryTitles),
      falseSwitchIsOn: false,
      trueSwitchIsOn: true,
    };

  }

  componentWillReceiveProps(nextProps){
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
                this.setState({falseSwitchIsOn: value});
                this.selectOrDeselectCategory(value, rowData);
              }}

              style={{marginBottom: 10}}
              value={this.props.chosenCategories.indexOf(rowData) !== -1} 

          />
        </View>
      )
  };


  render(){
        
      console.log("props please? ",this.props.chosenCategories);
    
    return(
      <View>
        <Text>Additonal Categories</Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );

  }

}
export default AdditionalCategories;
