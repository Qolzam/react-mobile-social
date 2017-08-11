import React from 'react'
import { View } from 'react-native'
import styles from './styles'



 export const Card = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
         

  )
}




