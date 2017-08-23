// Import libraries for making a component
import React from 'react'
import { Text, View } from 'react-native'

import styles from './styles'


// Make a component
export const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  )
}
