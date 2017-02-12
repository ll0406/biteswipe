import React, {Component} from 'react';

import {
  View,
  TextInput,
  Linking
} from 'react-native';

import styles from './styles';

import {
  getTheme
} from 'react-native-material-kit';

const theme = getTheme();

import {
  SocialIcon,
  Button
} from 'react-native-elements';

import Hr from 'react-native-hr';
import {ADDRESS} from '../../constants';
import {Actions} from 'react-native-router-flux';

import t from 'tcomb-form-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

const Form = t.form.Form;
const Email = t.subtype(t.String, email => {
  // http://emailregex.com/
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
});

const Password = t.subtype(t.String, password => {
  return password.length >= 6;
});

// form data model
const User = t.struct({
  email: Email,
  password: Password
});

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: {
        email: '',
        password: ''
      },
      options: {
        fields: {
          email: {
            autoCapitalize: 'none'
          },
          password: {
            password: true,
            secureTextEntry: true,
            error: 'Password must be at least 6 chars'
          }
        },
        hasError: false,
        error: ''
      }
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loginError !== this.state.loginError) {
      let options;
      if(nextProps.loginError.length) options = Object.assign({}, this.state.options, { hasError: true, error: nextProps.loginError });
      else options = Object.assign({}, this.state.options, { hasError: false, error: '' });
      this.setState({ options });
    }
  }

  onChange(value) {
    this.setState({
      value
    });
  }

  render() {

    const oauth = (strategy) => {
      Linking
      .openURL(`${ADDRESS}/api/auth/${strategy}/login`)
      .catch(err => console.log);
    }

    const login = () => {
      const value = this.refs.form.getValue();
      if(value){
        this.props.login(this.state.value.email, this.state.value.password);
      }
    };

    return (
      <View style={styles.container}>
        <View style={[theme.cardStyle, styles.card]}>

          <SocialIcon
            title="Sign In With Facebook"
            button
            type="facebook"
            onPress={() => oauth("facebook")}
            onLongPress={() => oauth("facebook")}
          />
          <SocialIcon
            title="Sign In With Google"
            button
            type="google-plus-official"
            onPress={() => oauth("google")}
            onLongPress={() => oauth("google")}
          />
          <SocialIcon
            title="Sign In With Twitter"
            button
            type="twitter"
            onPress={() => oauth("twitter")}
            onLongPress={() => oauth("twitter")}
          />

          <View style={styles.hr}>
            <Hr lineColor="black" text="or" margin={50}/>
          </View>

          <Form
            ref="form"
            type={User}
            options={this.state.options}
            onChange={this.onChange}
            value={this.state.value}
          />

          <Button title="Login" onPress={login} buttonStyle={styles.login}/>
          
        </View>
        <KeyboardSpacer onToggle={(a,b)=>console.log(a,b)}/>
      </View>
    );
  };
  
};
