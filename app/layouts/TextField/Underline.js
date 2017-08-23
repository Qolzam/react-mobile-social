'use strict'

import React, {
  Component,
} from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  StyleSheet,
  View,
} from 'react-native'

import styles from './styles'


export default class Underline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineLength: new Animated.Value(0)
    }
    this.wrapperWidth = 0
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      if (this.refs.wrapper == null) {
        return
      }
      const container = this.refs.wrapper; // un-box animated view
      container.measure((left, top, width, height) => {
        this.wrapperWidth = width
      })
    })
  }

  expandLine() {
    Animated.timing(this.state.lineLength, {
      duration: this.props.duration,
      toValue: this.wrapperWidth,
    }).start()
  }

  shrinkLine() {
    Animated.timing(this.state.lineLength, {
      duration: this.props.duration,
      toValue: 0
    }).start()
  }

  render() {
    let {
      underlineStyle,
      underlineHighlightStyle,
      error
    } = this.props;

    return (
      <View
        ref='wrapper'
        style={[
          underlineStyle,{backgroundColor: (error ? 'red' : StyleSheet.flatten(underlineStyle).backgroundColor)}
        ]}
      >
        <Animated.View style={[
          { width: this.state.lineLength },
          underlineHighlightStyle,{backgroundColor: (error ? 'red' : StyleSheet.flatten(underlineHighlightStyle).backgroundColor)}
        ]} />
      </View>
    )
  }
}

Underline.propTypes = {
  error: PropTypes.bool,
  duration: PropTypes.number,
  underlineHighlightStyle: View.propTypes.style,
  underlineStyle: View.propTypes.style,
}

Underline.defaultProps = {
  underlineHighlightStyle: styles.underlineHighlightStyle,
  underlineStyle: styles.underlineStyle
}
