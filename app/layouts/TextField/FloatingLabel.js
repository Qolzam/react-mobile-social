'use strict'

import React, {
  Component
} from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  StyleSheet,
  Text,
} from 'react-native'

import styles from './styles'


export default class FloatingLabel extends Component {
  constructor(props) {
    super(props)

    const {
      fontSize: fontSizeBase,
      ...labelBaseStyle,
    } = StyleSheet.flatten(props.labelBaseStyle)
    const {
      fontSize: fontSizeFloated,
      ...labelFloatedStyle
    } = StyleSheet.flatten(props.labelFloatedStyle)

    this.fontSizeBase = fontSizeBase
    this.fontSizeFloated = fontSizeFloated
    this.labelBaseStyle = labelBaseStyle
    this.labelFloatedStyle = labelFloatedStyle
    this.positionBase = 15
    this.positionFloated = 0

    const fontSize = props.hasValue ? this.fontSizeFloated : this.fontSizeBase
    const position = props.hasValue ? this.positionFloated : this.positionBase

    this.state = {
      fontSize: new Animated.Value(fontSize),
      top: new Animated.Value(position)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.hasValue === nextProps.hasValue
  }

  floatLabel() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, {
        duration: this.props.duration,
        toValue: this.fontSizeFloated
      }),
      Animated.timing(this.state.top, {
        duration: this.props.duration,
        toValue: this.positionFloated
      })
    ]).start()
  }

  sinkLabel() {
    Animated.parallel([
      Animated.timing(this.state.fontSize, {
        duration: this.props.duration,
        toValue: this.fontSizeBase
      }),
      Animated.timing(this.state.top, {
        duration: this.props.duration,
        toValue: this.positionBase
      })
    ]).start()
  }

  render() {
    const {
      error,
      focusHandler,
      hasValue,
      isFocused,
      label
    } = this.props

    const labelBaseStyle = this.labelBaseStyle
    let labelFloatedStyle = this.labelFloatedStyle

    if (!isFocused && !hasValue) {
      labelFloatedStyle = null
    }

    return (
      <Animated.Text
        onPress={() => {
          focusHandler()
        }}
        style={[
          styles.labelText,
          labelBaseStyle,
          labelFloatedStyle,
          {
            fontSize: this.state.fontSize,
            top: this.state.top,
            color: (error ? 'red' : StyleSheet.flatten(labelFloatedStyle || labelBaseStyle).color)
          }
        ]}
      >
        {label}
      </Animated.Text>
    )
  }
}

FloatingLabel.propTypes = {
  error: PropTypes.bool,
  duration: PropTypes.number,
  focusHandler: PropTypes.func,
  isFocused: PropTypes.bool,
  label: PropTypes.string,
  labelBaseStyle: Text.propTypes.style,
  labelFloatedStyle: Text.propTypes.style
}

FloatingLabel.defaultProps = {
  labelBaseStyle: styles.labelBaseStyle,
  labelFloatedStyle: styles.labelFloatedStyle
}
