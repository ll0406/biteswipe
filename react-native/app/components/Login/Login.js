import React, {Component} from 'react';

import {
  View,
  Image,
  TextInput,
  Button
} from 'react-native';

import styles from './styles';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setUsername(username) {
    this.setState({
      username
    })
  }

  setPassword(password) {
    this.setState({
      password
    })
  }

  render() {

    const login = () => {
      this.props.login(this.state.username, this.state.password);
    };  

    return (
      <View style={styles.container}>
        <Image 
          source={require('./grilled_cheese.jpg')}
        />
        <TextInput 
          placeholder="Username"
          onChangeText={(username) => this.setUsername(username)}
          value={this.state.username}
        />
        <TextInput 
          placeholder="Password"
          onChangeText={(password) => this.setPassword(password)}
          value={this.state.password}
        />
        <Button title="Login" onPress={login}></Button>
      </View>
    );
  };
  
};
