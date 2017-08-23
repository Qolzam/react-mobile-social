// - Import react components
import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, TabNavigator, TabView , StackNavigator } from 'react-navigation'

// - Import app components
import Login from './../components/Login'
import Home from './../components/Home'
import Profile from './../components/Profile'
import CreatePost from './../components/CreatePost'
import Signup from './../components/Signup'


// const HomeScreen = StackNavigator({
//   Home: {
//     screen: Home
//   },
//   CreatePost: { 
//     screen: CreatePost 
//   }
// })

export const Tabs = TabNavigator({
  Home: {
    screen: Home
  },
  Profile: {
    screen: Profile
  },
  
},{
  tabBarOptions: {
  activeTintColor: '#ffffff',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#212121',
  },
}

})

export const MasterNavigator = StackNavigator({
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  },
  Tabs: {
    screen: Tabs,
  },
              CreatePost: { 
                screen: CreatePost 
              },
}, {
    mode: 'modal',
    headerMode: 'screen'
  })

/**
 * Create router component and set custom navigation with redux state and dispatch
 */
const Router = ({ dispatch, nav }) => (
  <MasterNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

/**
 * Map state of redux store to props
 * @param {object} state 
 */
const mapStateToProps = state => ({
  nav: state.nav
});

/**
 * Connect app to redux store
 */
export default connect(mapStateToProps)(Router)