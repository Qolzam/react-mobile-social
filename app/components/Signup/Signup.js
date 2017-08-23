// - Import react components
import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Slider, ScrollView, View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { changeData, dbSignup } from './../../actions';
import { Card, CardSection, Input, Button, FlatButton, Spinner, TextField } from './../../layouts'


// - Import component styles 
import styles from './styles'

// - Import Actions
import * as authorizeActions from './../../actions/authorizeActions'


/**
 * Create component class
 * 
 * @export
 * @class Signup
 * @extends {Component}
 */
export class Signup extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const { navigate } = navigation
    return {
      title: 'Signup',
      headerTintColor: "#616161",
      headerStyle: styles.header

    }
  }

  constructor(props) {
    super(props)

    // Default state
    this.state = {
      fullNameInput: '',
      fullNameInputError: '',
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmPasswordInput: '',
      confirmPasswordInputError: '',
      loading: false
    }

  }

  /**
   * On full name input change
   * 
   * @param {any} text 
   * @memberof Signup
   */
  onfullNameChange(text) {
    this.setState({
      fullNameInput: text,
      fullNameInputError: ''
    })
  }

  /**
  * On email input change
  * 
  * @param {any} text 
  * @memberof Signup
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
   * @memberof Signup
   */
  onPasswordChange(text) {
    this.setState({
      passwordInput: text,
      passwordInputError: ''
    })
  }

  /**
   * On confirm password input change event
   * 
   * @param {any} text 
   * @memberof Signup
   */
  onConfirmPasswordChange(text) {
    this.setState({
      confirmPasswordInput: text,
      confirmPasswordInputError: ''
    })
  }

  /**
   * On loggin button pressed
   * 
   * @memberof Signup
   */
  onSignupButton() {
    const { register } = this.props
    const { fullNameInput, emailInput, passwordInput, confirmPasswordInput } = this.state;

    if (_.trim(fullNameInput) === '') {
      this.setState({
        fullNameInputError: 'Field is required.'
      })
      return
    }

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

    if (_.trim(confirmPasswordInput) === '') {
      this.setState({
        confirmPasswordInputError: 'Field is required.'
      })
      return
    }
    if (confirmPasswordInput !== passwordInput) {
      this.setState({
        confirmPasswordInputError: 'Should be equal to password.',
        passwordInputError: 'Should be equal to confirm password.'
      })
      return
    }


    register({
      fullName: fullNameInput,
      email:emailInput,
      password: passwordInput
    })
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
        <Button onPress={this.onSignupButton.bind(this)}>
          Signup
      </Button>

      </CardSection>
    )
  }

  render() {

    const {
      fullNameInput,
      fullNameInputError,
      emailInput,
      emailInputError,
      passwordInput,
      passwordInputError,
      confirmPasswordInput,
      confirmPasswordInputError } = this.state

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
                label="Full Name"
                onChangeText={this.onfullNameChange.bind(this)}
                value={fullNameInput}
                error={fullNameInputError !== ''}
                helperText={fullNameInputError}
              />
              <View style={{ height: 20 }} />
              <TextField
                label="Email"
                keyboardType='email-address'
                onChangeText={this.onEmailChange.bind(this)}
                value={emailInput}
                error={emailInputError !== ''}
                helperText={emailInputError}
              />
              <View style={{ height: 20 }} />
              <TextField
                secureTextEntry
                label="Password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={passwordInput}
                error={passwordInputError !== ''}
                helperText={passwordInputError}
              />
              <View style={{ height: 20 }} />
              <TextField
                secureTextEntry
                label="Confirm Password"
                onChangeText={this.onConfirmPasswordChange.bind(this)}
                value={confirmPasswordInput}
                error={confirmPasswordInputError !== ''}
                helperText={confirmPasswordInputError}
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
    register: (data) => dispatch(authorizeActions.dbSignup(data))
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
