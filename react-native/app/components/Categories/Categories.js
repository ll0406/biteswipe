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

    console.log("like honestly, what the F U C K: ");

    this._renderRow = this._renderRow.bind(this);
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    
    const categorySwitchStates = {};    

    props.categories.forEach((category) => {
       categorySwitchStates[category] = true; 
    })

    this.state = {
      ds, 
      dataSource: ds.cloneWithRows(props.categories),
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      categorySwitchStates 
    };


  }

  componentDidMount(){
    this.props.getCategories();    
  }

  componentWillUnmount(){
    const categorySwitchStates = this.state.categorySwitchStates;
    const categories = [];

    Object.keys(categorySwitchStates).forEach((category) => {
      if(categorySwitchStates[category]) categories.push(category);
    });

    this.props.setCategories(categories);
  }

  selectOrDeselectCategory(value, rowData){
     console.log("select/deselect: value ", value);     
     console.log("select/deselect: rowData ", rowData);
     
     let categorySwitchStates = this.state.categorySwitchStates;

     const dataSource = this.state.ds.cloneWithRows(this.props.categories);

     categorySwitchStates[rowData] = value;

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
    console.log("state here?? ", this.state);
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