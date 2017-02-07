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

class Categories extends Component {


  constructor(props) {
    super(props);

    this._renderRow = this._renderRow.bind(this);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }

  state = {
    trueSwitchIsOn: true,
    falseSwitchIsOn: false,
  };

  componentDidMount() {

  }

  _renderRow(rowData){
      return(
        <View>
          <Text>{rowData}</Text>
          <Switch
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              style={{marginBottom: 10}}
              value={this.state.falseSwitchIsOn} 
          />
        </View>
      )
  };


  render() {
   
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      </View>
    );

  }
}


export default Categories;