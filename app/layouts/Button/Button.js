// - Import react components
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

/**
 * Create react component
 * @param {object} param0 component props
 */
export const Button = ({ onPress, children, textStyle, buttonStyle }) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyle,buttonStyle]}>
      <Text style={[styles.textStyle,textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

