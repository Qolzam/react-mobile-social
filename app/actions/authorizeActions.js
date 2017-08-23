// - Import react components
import { firebaseRef, firebaseAuth } from '../firebase'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'


// - Import action types
import * as types from './../constants/actionTypes'

// - Import actions
import * as globalActions from './globalActions'

/* _____________ CRUD DB _____________ */

/**
 * Log in user in server
 * @param {string} email 
 * @param {string} password 
 */
export var dbLogin = (email, password) => {
  return (dispatch, getState) => {

      // Show loading on starting
      dispatch(globalActions.showLoading())
    
    return firebaseAuth().signInWithEmailAndPassword(email, password).then((result) => {
      dispatch(globalActions.showNotificationSuccess())
      dispatch(login(result.uid))
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Tabs' })
        ]
      })
      dispatch(resetAction)

      // Hide loading on successful result
      dispatch(globalActions.hideLoading())
      

    }, (error) => {
      // Hide loading on error
      dispatch(globalActions.hideLoading())

      dispatch(globalActions.showErrorMessageWithTimeout(error.code))

    })
  }
}

/**
 * Log out user in server
 */
export var dbLogout = () => {
  return (dispatch, getState) => {
    return firebaseAuth().signOut().then((result) => {
      dispatch(logout())
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'login' })
        ]
      })
      dispatch(resetAction)

    }, (error) => dispatch(globalActions.showErrorMessageWithTimeout(error.code)))
  }

}

/**
 * Register user in database
 * @param {object} user 
 */
export var dbSignup = (user) => {
  return (dispatch, getState) => {
    dispatch(globalActions.showNotificationRequest())
    return firebaseAuth().createUserWithEmailAndPassword(user.email, user.password).then((signupResult) => {
      firebaseRef.child(`users/${signupResult.uid}/info`).set({
        ...user,
        avatar: 'noImage'
      }).then((result) => {

        dispatch(globalActions.showNotificationSuccess())

      }, (error) => dispatch(globalActions.showErrorMessageWithTimeout(error.code)))

      dispatch(signup({
        uid: signupResult.uid,
        ...user
      }))
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Tabs' })
        ]
      })
      dispatch(resetAction)
    }, (error) => dispatch(globalActions.showErrorMessageWithTimeout(error.code)))
  }

}

/**
 * Change user's password
 * @param {string} newPassword 
 */
export const dbUpdatePassword = (newPassword) => {
  return (dispatch, getState) => {
    dispatch(globalActions.showNotificationRequest())
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {

        user.updatePassword(newPassword).then(() => {
          // Update successful.
          dispatch(globalActions.showNotificationSuccess())
          dispatch(updatePassword())
          // TODO: Change to home page
        }, (error) => {
          // An error happened.
          switch (error.code) {
            case 'auth/requires-recent-login':
              dispatch(globalActions.showErrorMessageWithTimeout(error.code))
              dispatch(dbLogout())
              break;
            default:

          }
        })
      }

    })
  }
}

/* _____________ CRUD State _____________ */

/**
 * Loing user
 * @param {string} uid 
 */
export var login = (uid) => {
  return { type: types.LOGIN, authed: true, uid }
}

/**
 * Logout user
 */
export var logout = () => {
  return { type: types.LOGOUT }
}

/**
 *  Register user
 * @param {object} user 
 */
export var signup = (user) => {
  return {
    type: types.SIGNUP,
    ...user
  }

}

/**
 * Update user's password
 */
export const updatePassword = () => {
  return { type: types.UPDATE_PASSWORD }
}

