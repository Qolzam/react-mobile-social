// - Import external components
import * as redux from 'redux'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import reducers from './../reducers'


// - Build the middleware for intercepting and dispatching navigation actions
const logger = createLogger()


// - initial state
var initialState = {


}

// - Config and create store of redux
var store = redux.createStore(reducers, initialState, redux.compose(
  redux.applyMiddleware(logger,thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

export default store
