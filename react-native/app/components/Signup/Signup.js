import React, {Component} from 'react';

import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

import styles from './styles';

import {
  getTheme
} from 'react-native-material-kit';

import { Actions } from 'react-native-router-flux';

const theme = getTheme();

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setEmail(email) {
    this.setState({
      email
    })
  }

  setPassword(password) {
    this.setState({
      password
    })
  }

  render() {

    const signup = () => {

    };

    return (
      <View style={[theme.cardStyle, this.props.style]}>
        <View style={styles.container}>
          <TextInput 
            placeholder="Email"
            onChangeText={(email) => this.setEmail(email)}
            value={this.state.email}
            keyboardType="email-address"
          />
          <TextInput 
            placeholder="Password"
            onChangeText={(password) => this.setPassword(password)}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Button title="Signup" onPress={signup}></Button>
        </View>
      </View>
    );
  };
  
};
