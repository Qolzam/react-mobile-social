import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import styles from './styles'


export const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator color='blue' size={size || 'large'} style={{transform: [{translateX: 0}, {translateY: 5}]}} />
    </View>
  )
}
