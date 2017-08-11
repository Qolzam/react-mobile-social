// - Import react components
import React, { Component } from 'react'
import {
  AppRegistry
} from 'react-native'

// - Import app components
import App from './app/App'

export default class socail extends Component {
  render() {
    return (
      <App platform='android'/>
    );
  }
}



AppRegistry.registerComponent('socail', () => socail)
