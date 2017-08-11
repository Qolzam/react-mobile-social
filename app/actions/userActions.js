// - Import react components
import {firebaseRef} from '../firebase'

// - Import action types
import * as types from './../constants/actionTypes'


// - User info
export const userInfo = (info) => {
  return{
    type: types.USER_INFO,
    info
  }
}

/* _____________ CRUD DB _____________ */

// - Set user avatar to database
export const dbSetAvatar = (url) => {
  return (dispatch,getState) => {

          // Get current user id
          var uid = getState().authorize.uid

          // Write the new data simultaneously in the list
            var updates = {};
            updates[`users/${uid}/info/avatar`] = url;

          return firebaseRef.update(updates).then((result) => {
            dispatch(setUserAvatar(url))
          },(error) => {
            console.log(error);
          });
  }
}

// - Get user info from database
export const dbGetUserInfo = () => {
  return (dispatch, getState) => {
    var uid = getState().authorize.uid
    if (uid) {
      var userInfoRef = firebaseRef.child(`users/${uid}/info`);

      return userInfoRef.once('value').then((snapshot) => {
        var userInfo = snapshot.val() || {};
        dispatch(addUserInfo(uid,userInfo))
      },error => console.log(error));

    }
  }
}

/**
 *  Get user info from database
 * @param {string} uid 
 */
export const dbGetUserInfoByUserId = (uid,sw) => {
  return (dispatch, getState) => {
    if (uid) {
      var userInfoRef = firebaseRef.child(`users/${uid}/info`);

      return userInfoRef.once('value').then((snapshot) => {
        var userInfo = snapshot.val() || {};
        dispatch(addUserInfo(uid,userInfo))
        switch (sw) {
          case 'header':
        dispatch(globalActions.setHeaderTitle(userInfo.fullName))
            
            break;
        
          default:
            break;
        }
      },error => console.log(error));

    }
  }
}

/**
 * Updata user information
 * @param {object} newInfo 
 */
export const dbUpdateUserInfo = (newInfo) => {
    return (dispatch,getState) => {

  // Get current user id
    var uid = getState().authorize.uid

    // Write the new data simultaneously in the list
    let updates = {};
    let info = getState().user.info[uid]
    let updatedInfo = {
          avatar: newInfo.avatar || info.avatar,
          email: newInfo.email || info.email,
          fullName: newInfo.fullName || info.fullName,
          tagLine: newInfo.tagLine || info.tagLine,
          birthday: newInfo.birthday || info.birthday
    }
    updates[`users/${uid}/info`] = updatedInfo
    return firebaseRef.update(updates).then((result) => {
    
      dispatch(updateUserInfo(uid,updatedInfo))
      dispatch(globalActions.closeEditProfile())
    }, (error) => {
      dispatch(globalActions.showErrorMessage(error.message))
    })
    }

}

/* _____________ CRUD State _____________ */

// - Set user avatar
export const setUserAvatar = (url) => {
  return{
    type: types.ADD_USER_AVATAR,
    url
  }
}

/**
 * Add user information
 * @param {string} uid is the user identifier
 * @param {object} info is the information about user
 */
export const addUserInfo = (uid,info) => {
  return{
    type: types.ADD_USER_INFO,
    payload: {uid,info}
  }
}

/**
 * Update user information
 * @param {string} uid is the user identifier
 * @param {object} info is the information about user
 */
  export const updateUserInfo = (uid,info) => {
    return{
      type: types.UPDATE_USER_INFO,
      payload: {uid,info}
    }
}

export const clearAllUsers = () => {
  return {
    type: types.CLEAR_ALL_DATA_USER
  }
}
