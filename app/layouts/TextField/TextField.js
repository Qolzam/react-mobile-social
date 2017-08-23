'use strict'

import React, {
  Component,
} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import styles from './styles'

import HelperText from './HelperText'
import FloatingLabel from './FloatingLabel'
import Underline from './Underline'

export class TextField extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isFocused: false,
      text: props.value,
      height: props.height
    }
  }

  blur() {
    this.refs.input.blur()
  }

  focus() {
    this.refs.input.focus()
  }

  isFocused() {
    return this.state.isFocused
  }

  measureLayout(...args) {
    this.refs.wrapper.measureLayout(...args)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.value) {
      nextProps.value.length !== 0
        ? this.refs.floatingLabel.floatLabel()
        : this.refs.floatingLabel.sinkLabel()
      this.setState({text: nextProps.value})
    }

    if (this.props.height !== nextProps.height) {
      this.setState({height: nextProps.height})
    }
  }

  render() {
    const {
      autoGrow,
      duration,
      height,
      helperText,
      helperTextStyle,
      inputStyle,
      label,
      labelBaseStyle,
      labelFloatedStyle,
      multiline,
      onBlur,
      onChange,
      onChangeText,
      onFocus,
      textBlurColor,
      textColor,
      textFocusColor,
      value,
      wrapperStyle,
      underlineStyle,
      underlineHighlightStyle,
      error,
      ...props,
    } = this.props

    return (
      <View
        ref='wrapper'
        style={[
          styles.wrapper,
          this.state.height
            ? {height: undefined}
            : {},
          wrapperStyle,
        ]}
      >
        <TextInput
          multiline={multiline}
          onFocus={() => {
            this.setState({isFocused: true});
            this.refs.floatingLabel.floatLabel();
            this.refs.underline.expandLine();
            onFocus && onFocus();
          }}
          onBlur={() => {
            this.setState({isFocused: false});
            !this.state.text.length && this.refs.floatingLabel.sinkLabel();
            this.refs.underline.shrinkLine();
            onBlur && onBlur();
          }}
          onChangeText={(text) => {
            this.setState({text});
            onChangeText && onChangeText(text);
          }}
          onChange={(event) => {
            if (autoGrow) {
              this.setState({height: event.nativeEvent.contentSize.height});
            }
            onChange && onChange(event);
          }}
          ref='input'
          style={[
            styles.textInput,
            {color: textColor},
            this.state.isFocused && textFocusColor
              ? {color: textFocusColor}
              : {},
            !this.state.isFocused && textBlurColor
              ? {color: textBlurColor}
              : {},
            inputStyle,
            this.state.height
              ? {height: this.state.height}
              : {}
          ]}
          value={this.state.text}
          {...props}
        />

        <Underline
          duration={duration}
          ref='underline'
          underlineStyle={underlineStyle}
          underlineHighlightStyle={underlineHighlightStyle}
          error={error}
        />

        <FloatingLabel
          duration={duration}
          focusHandler={this.focus.bind(this)}
          hasValue={(this.state.text.length) ? true : false}
          isFocused={this.state.isFocused}
          label={label}
          labelBaseStyle={labelBaseStyle}
          labelFloatedStyle={labelFloatedStyle}
          ref='floatingLabel'
          error={error}
        />

        <HelperText
          duration={duration}
          focusHandler={this.focus.bind(this)}
          hasValue={(this.state.text.length) ? true : false}
          isFocused={this.state.isFocused}
          helperText={helperText}
          helperTextStyle={helperTextStyle}
          error={error}
          ref='helperText'
        />
      </View>
    )
  }
}

TextField.propTypes = {
  autoGrow: PropTypes.bool,
  error: PropTypes.bool,
  duration: PropTypes.number,
  height: PropTypes.oneOfType([
    PropTypes.oneOf(undefined),
    PropTypes.number
  ]),
  helperText: PropTypes.string,
  helperTextStyle: Text.propTypes.style,
  inputStyle: Text.propTypes.style,
  label: PropTypes.string,
  labelBaseStyle: Text.propTypes.style,
  labelFloatedStyle: Text.propTypes.style,
  multiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  textBlurColor: PropTypes.string,
  textColor: PropTypes.string,
  textFocusColor: PropTypes.string,
  underlineHighlightStyle: View.propTypes.style,
  underlineStyle: View.propTypes.style,
  value: PropTypes.string,
  wrapperStyle: View.propTypes.style,
}

TextField.defaultProps = {
  autoGrow: false,
  error:false,
  duration: 200,
  height: undefined,
  multiline: false,
  textColor: '#000',
  underlineColorAndroid: 'rgba(0, 0, 0, 0)',
  value: ''
}