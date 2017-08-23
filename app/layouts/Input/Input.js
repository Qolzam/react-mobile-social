import React from 'react'
import { TextInput, View, Text } from 'react-native'
import styles from './styles'


export const Input = ({ style, label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={[inputStyle,style]}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize = 'none'
      />
    </View>
  )
}