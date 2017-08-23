// - Import react components
import { StyleSheet, PixelRatio } from 'react-native'

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  buttonText: {
    color: 'grey'
  },
  button: {
    borderColor: 'grey'
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  logoImage: {
    width: 100,
    height: 100
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
  },
  header: {
    backgroundColor: "#ffffff"
  },
  createAccountText: {
    color: 'rgba(0, 0, 0, 0.60)'
  },
  createAccountButton: {
    marginTop: 8
  },
  inputError: {
    borderBottomColor: '#47315a',
    borderBottomWidth: 1 / PixelRatio.get()
  }
})
export default styles