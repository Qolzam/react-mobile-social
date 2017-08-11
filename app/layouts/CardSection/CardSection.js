import React from 'react'
import { View } from 'react-native'
import _merge from 'lodash.merge'
import styles from './styles'


export const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  )
}


