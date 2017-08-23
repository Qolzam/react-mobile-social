// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar
} from 'react-native'
import UserAvatar from 'react-native-user-avatar'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'


// - Import Actions
import * as globalActions from './../../actions/globalActions'


// - Import component styles 
import styles from './styles'

// - Import app components
import Router from './../../routes/Router'

/**
 * Create component class
 * 
 * @export
 * @class Home
 * @extends {Component}
 */
export class Master extends Component {

  constructor(props) {
    super(props)


  }

  resize = ({ window }) => {
    const {windowResize} = this.props
    windowResize(window.height,window.width)
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.resize)
    const window =  Dimensions.get('window')
    this.resize({window})
  }

  componentWillUnMount() {
    Dimensions.removeEventListener('change', this.resize)

  }


  render() {

    const {windowSize,error} = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.loadingLayout,{left: (windowSize.width * 0.5) - 20}]}>
          {(this.props.loading) ? <Spinner size="small" /> : <Text></Text>
          }
        </View>

        <Router />
      
      </View>
    )

  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    windowResize : (height,width) => {
      dispatch(globalActions.changeWindowSize(height,width))
    }
  }

}

/**
 * Map state to props
 * @param {object} param0 
 */
const mapStateToProps = ({ global }) => {
  const { loading, windowSize,error } = global
  return { loading ,windowSize, error}
}

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps, mapDispatchToProps)(Master)
