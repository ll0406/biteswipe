import React, {Component} from 'react';

import {
  Platform,
  View,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import styles from './styles';

import {
  getTheme
} from 'react-native-material-kit';

import {
  SocialIcon,
  Button
} from 'react-native-elements';

const theme = getTheme();

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setName(name) {
    this.setState({
      name
    })
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
      this.props.signup(this.state.name, this.state.email, this.state.password);
    };

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={[theme.cardStyle, styles.card]}>

          <View style={styles.inputs}>
            <TextInput 
              placeholder="Name"
              onChangeText={(name) => this.setName(name)}
              value={this.state.name}
              style={styles.name}
              autoCapitalize="none"
            />
            <TextInput 
              placeholder="Email"
              onChangeText={(email) => this.setEmail(email)}
              value={this.state.email}
              keyboardType="email-address"
              style={styles.email}
              autoCapitalize="none"
            />
            <TextInput 
              placeholder="Password"
              onChangeText={(password) => this.setPassword(password)}
              value={this.state.password}
              secureTextEntry={true}
              style={styles.password}
            />
          </View>

          <Button title="Signup" onPress={signup} buttonStyle={styles.signup}/>
          
        </KeyboardAvoidingView>
      </View>
    );
  };
  
};
