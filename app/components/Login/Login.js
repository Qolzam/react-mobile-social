// - Import react components
import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Slider, ScrollView, View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { changeData, dbLogin } from './../../actions';
import { Card, CardSection, Input, Button, FlatButton, Spinner, TextField } from './../../layouts'


// - Import component styles 
import styles from './styles'

// - Import Actions
import * as authorizeActions from './../../actions/authorizeActions'


/**
 * Create component class
 * 
 * @export
 * @class Login
 * @extends {Component}
 */
export class Login extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const { navigate } = navigation
    return {
      title: 'Login',
      headerTintColor: "#616161",
      headerStyle: styles.header

    }
  }

  constructor(props) {
    super(props)

    // Default state
    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      loading: false
    }

  }

  /**
   * On email input change
   * 
   * @param {any} text 
   * @memberof Login
   */
  onEmailChange(text) {
    this.setState({
      emailInput: text,
      emailInputError: ''
    })
  }

  /**
   * On password input change event
   * 
   * @param {any} text 
   * @memberof Login
   */
  onPasswordChange(text) {
    this.setState({
      passwordInput: text,
      passwordInputError: ''
    })
  }

  /**
   * On loggin button pressed
   * 
   * @memberof Login
   */
  onLoginButton() {
    const { login } = this.props
    const { emailInput, passwordInput } = this.state;

    if (_.trim(emailInput) === '') {
      this.setState({
        emailInputError: 'Field is required.'
      })
      return
    }

    if (_.trim(passwordInput) === '') {
      this.setState({
        passwordInputError: 'Field is required.'
      })
      return
    }


    login(emailInput, passwordInput)
  }

  renderButton() {

    if (this.props.loading) {
      return (
        <Button textStyle={styles.buttonText} buttonStyle={styles.button}>
          Loading ...
              </Button>

      )
    }

    const { navigation } = this.props


    return (
      <CardSection style={styles.buttons}>
        <Button onPress={this.onLoginButton.bind(this)}>
          Login
      </Button>
        <FlatButton textStyle={styles.createAccountText} buttonStyle={styles.createAccountButton} onPress={() => navigation.navigate('Signup')}>
          Create a new account
    </FlatButton>
      </CardSection>
    )
  }

  render() {

    const { emailInput, emailInputError, passwordInput, passwordInputError } = this.state

    return (

      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Card>
            <CardSection style={styles.logo}>
              <Image
                style={styles.logoImage}
                source={{ uri: 'https://raw.githubusercontent.com/Qolzam/react-social-network/master/docs/app/logo.png' }}
              />
            </CardSection>
            <Text style={{ alignSelf: 'center', fontSize: 30, color: '#eeeeee' }}>Green</Text>
            <View style={{ height: 20 }} />
            <View style={{ padding: 20 }}>
              <TextField
                label="Email"
                keyboardType='email-address'
                onChangeText={this.onEmailChange.bind(this)}
                value={emailInput}
                error= {emailInputError !== ''}
                helperText={emailInputError}
              />
              <View style={{ height: 20 }} />
              <TextField
                secureTextEntry
                label="Password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={passwordInput}
                error= {passwordInputError !== ''}
                helperText={passwordInputError}
              />
            </View>
            <View style={{ height: 20 }} />

            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>

            {this.renderButton()}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (email, password) => dispatch(authorizeActions.dbLogin(email, password))
  }
}


/**
 * Map state to props
 * @param {object} param0 
 */
const mapStateToProps = ({ global }) => {
  const { error, loading } = global
  return { error, loading }
}

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps, mapDispatchToProps)(Login)
