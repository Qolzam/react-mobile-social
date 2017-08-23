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


export default class HelperText extends Component {
  constructor(props) {
    super(props)

    const {
      error,
      height: heightActive,
      ...helperTextStyle
    } = StyleSheet.flatten(props.helperTextStyle)

    this.helperTextStyle = helperTextStyle
    this.heightBase = 0
    this.heightActive = heightActive

    const height = props.helperText ? this.heightActive : this.heightBase

    this.state = {
      height: new Animated.Value(height),
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.hasValue === nextProps.hasValue
  }

  hideHelperText() {
    Animated.timing(this.state.height, {
      duration: this.props.duration,
      toValue: this.heightBase,
    }).start()
  }

  revealHelperText() {
    Animated.timing(this.state.height, {
      duration: this.props.duration,
      toValue: this.heightActive,
    }).start()
  }

  render() {
    const {
      error,
      focusHandler,
      hasValue,
      isFocused,
      helperText,
    } = this.props

    const helperTextStyle = this.helperTextStyle

    return (
      <Animated.Text
        onPress={() => {
          focusHandler();
        }}
        style={[
          helperTextStyle,
          {
            fontSize: this.state.fontSize,
            top: this.state.top,
            color: (error ? 'red' : StyleSheet.flatten(helperTextStyle).color)
          },
        ]}
      >
        {helperText}
      </Animated.Text>
    )
  }
}

HelperText.propTypes = {
  error: PropTypes.bool,
  duration: PropTypes.number,
  focusHandler: PropTypes.func,
  helperText: PropTypes.string,
  helperTextStyle: Text.propTypes.style,
  isFocused: PropTypes.bool
}

HelperText.defaultProps = {
  helperTextStyle: styles.helperTextStyle
}
