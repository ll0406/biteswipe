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

import Loading from '../Loading';

class AdditionalCategories extends Component {
  constructor(props){
    super(props);
    this._renderRow = this._renderRow.bind(this);
    this.selectOrDeselectCategory = this.selectOrDeselectCategory.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const categoryTitles = props.categories.map(category => category.title);

    const categorySwitchStates = {};    

    props.chosenCategories.forEach((category) => {
       categorySwitchStates[category] = true; 
    })
    
    this.state = {
      ds,
      dataSource: ds.cloneWithRows(categoryTitles),
      categorySwitchStates,
      categoryTitles,
      loading: false
    };

  }

  componentDidMount(){
    this.setState({
      loading: true
    });

    this.props.getCategories()
    .then(() => {
      this.setState({
        loading: false
      });
    })
    .catch(console.log);
  }

  componentWillReceiveProps(newProps){
    // receive master list of categories
    if(newProps.categories){
      const categoryTitles = newProps.categories.map(category => category.title);
      const dataSource = this.state.ds.cloneWithRows(categoryTitles);
      this.setState({categoryTitles, dataSource});
    };

    if(newProps.chosenCategories){
     
     const categorySwitchStates = {};    

     newProps.chosenCategories.forEach((category) => {
       categorySwitchStates[category] = true; 
     })

     const dataSource = this.state.ds.cloneWithRows(this.state.categoryTitles.slice());
     this.setState({categorySwitchStates, dataSource});
    };
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
  }

  render(){
    if(this.state.loading) {
      return (
        <Loading/>
        );
    }
    else {    
      return(
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            enableEmptySections
          />
        </View>
      );
    }
  }
}

export default AdditionalCategories;
