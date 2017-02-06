import React, {Component} from 'react';

import {
  Platform,
  View,
  KeyboardAvoidingView
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

import t from 'tcomb-form-native';

const Form = t.form.Form;
const Email = t.subtype(t.String, email => {
  // http://emailregex.com/
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
});

const Password = t.subtype(t.String, password => {
  return password.length >= 6;
});

const samePasswords = (user) => (user.password === user.confirm_password)

// form data model (wrap in subtype to utilize samePasswords validation)
const User = t.subtype(t.struct({
  name: t.String,
  email: Email,
  password: Password,
  confirm_password: Password
}), samePasswords);

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: '',
        email: '',
        password: ''
      },
      options: {
        email: {
          autoCapitalize: 'none'
        },
        fields: {
          password: {
            password: true,
            secureTextEntry: true,
            error: 'Password must be at least 6 characters'
          },
          confirm_password: {
            label: 'Confirm Password',
            password: true,
            secureTextEntry: true,
            error: 'Password must be at least 6 characters'
          }
        },
        hasError: false,
        error: ''
      }
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.signupError !== this.state.signupError) {
      let options;
      if(nextProps.signupError.length) options = Object.assign({}, this.state.options, { hasError: true, error: nextProps.signupError });
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

    const signup = () => {
      const value = this.refs.form.getValue();
      if(value){
        this.props.signup(this.state.value.name, this.state.value.email, this.state.value.password);
      } else if(this.state.value.password && this.state.value.confirm_password){
        let options;
        if (!samePasswords(this.state.value)) options = Object.assign({}, this.state.options, { hasError: true, error: 'Passwords must be the same' });
        else options = Object.assign({}, this.state.options, { hasError: false, error: '' });
        this.setState({ options });
      }
    };

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={[theme.cardStyle, styles.card]}>

          <Form
            ref="form"
            type={User}
            options={this.state.options}
            onChange={this.onChange}
            value={this.state.value}
          />

          <Button title="Signup" onPress={signup} buttonStyle={styles.signup}/>
          
        </KeyboardAvoidingView>
      </View>
    );
  };
  
};
