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

    const categorySwitchStates = {};    

    props.chosenCategories.forEach((category) => {
       categorySwitchStates[category] = true; 
    })
    
    this.state = {
      ds,
      dataSource: ds.cloneWithRows(categoryTitles),
      categorySwitchStates,
      categoryTitles
    };

  }

  componentDidMount(){
    this.props.getCategories();
  }

  componentWillReceiveProps(newProps){
    if(newProps.chosenCategories){
     
     const categorySwitchStates = {};    

     newProps.chosenCategories.forEach((category) => {
       categorySwitchStates[category] = true; 
     })

     const dataSource = this.state.ds.cloneWithRows(this.state.categoryTitles.slice());
     this.setState({categorySwitchStates, dataSource});
    }
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
     let categorySwitchStates = this.state.categorySwitchStates;

     categorySwitchStates[rowData] = value;

     const dataSource = this.state.ds.cloneWithRows(this.state.categoryTitles.slice());

     this.setState({categorySwitchStates, dataSource});

  };



  _renderRow(rowData){
      const onSwitch = this.state.categorySwitchStates[rowData] ? this.state.categorySwitchStates[rowData] : false;
      
      console.log("rowdata?? ", rowData);

      return(
        <View>
          <Text>{rowData}</Text>
          <Switch
              onValueChange={(value) => {
                this.selectOrDeselectCategory(value, rowData);
              }}

              style={{marginBottom: 10}}
              value={onSwitch} 

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
