// - Import react components
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import store from './config/store'

// - Import components
import Master from './components/Master'



class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Master />
      </Provider>

    )
  }
}

export default App;

