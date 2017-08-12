// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View, 
  Text
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'


// - Import component styles 
import styles from './styles'

// - Import app components
import Avatar from './../Avatar'

/**
 * Create component class
 * 
 * @export
 * @class Home
 * @extends {Component}
 */
export class Comment extends Component {

  /**
   * Creates an instance of Comment.
   * @param {any} props 
   * @memberof Comment
   */
  constructor (props) {
      super(props)
    }

  render() {

    return (
        <CardSection style={styles.comment}>
          <Avatar size="30" name='name' fileName='filename' />
                      <View style={styles.contetnt}>
              <Text>Homed Form Ios</Text>
              <Text>Homed Form Ios</Text>
            </View>
          <Text style={styles.date}>8m</Text>
         </CardSection>
    )

  }
}

/**
 * Map state to props
 * @param {object} param0 
 */
const mapStateToProps = () => {

  return { }
}

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps, {

})(Comment)
