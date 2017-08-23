// - Import react components
import {StyleSheet} from 'react-native' 

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    paddingTop: 12,
    position: 'relative',
  },
  textInput: {
    fontSize: 16,
    height: 28,
    lineHeight: 24,
    zIndex: 1,
  },
  labelText: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    left: 0,
    position: 'absolute',
  },
  underlineHighlightStyle: {
    backgroundColor: '#00bcd4',
    height: 1
  },
  underlineStyle: {
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    height: 1
  },
  labelBaseStyle: {
    fontSize: 14,
    color:'#9E9E9E'
  },
  labelFloatedStyle: {
    fontSize: 10,
    color:'#00bcd4'
  },
  helperTextStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color:'orange',
    paddingTop: 4,
    fontSize: 14,
    height: 24,
  }
})
export default styles