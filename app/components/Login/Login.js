// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Slider, View, Text} from 'react-native'
import { changeData, dbLogin } from './../../actions';
import { Card, CardSection, Input, Button, Spinner }  from './../../layouts'


// - Import component styles 
import styles from './styles'

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
      headerStyle: {
         backgroundColor:"#ffffff"
       }

    }
  }

  constructor(props){
    super(props)

    // Default state
      this.state = {
        emailInput : 'amir.gholzam@live.com',
        passwordInput : '123!@#',
        error : '',
        loading : false
      }
  }
  onEmailChange(text) {
     this.setState({
      emailInput: text
     })
  }

  onPasswordChange(text) {
     this.setState({
      passwordInput: text
     })
  }

  onButtonPress() {
    const { emailInput, passwordInput } = this.state;

     this.props.dbLogin(emailInput, passwordInput);
  }

  renderButton() {
   
    if(this.props.loading)
      {
        return (
              <Button textStyle={{color: 'grey',}} buttonStyle={{borderColor: 'grey'}}>
                Loading ...
              </Button>
            )
      }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

  render() {
    return (
  
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.state.emailInput}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.state.passwordInput}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
    </Card>
    );
  }
}

/**
 * Map state to props
 * @param {object} param0 
 */
const mapStateToProps = ({global}) => {
    const {error, loading} = global
  return {error,loading}
}

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps, {
  dbLogin
})(Login)
