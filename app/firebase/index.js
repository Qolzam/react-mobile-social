import firebase from 'firebase'

try {
  var config = {
    apiKey: "AIzaSyDu35sI0UTHR66eUCWeMgXk5-lmFnJhjgY",
    authDomain: "open-social-33d92.firebaseapp.com",
    databaseURL: "https://open-social-33d92.firebaseio.com",
    projectId: "open-social-33d92",
    storageBucket: "open-social-33d92.appspot.com",
    messagingSenderId: "509419779470"
    }

  firebase.initializeApp(config)
} catch (e) {

}

// - Storage reference
export var storageRef = firebase.storage().ref()

// - Database authorize
export var firebaseAuth = firebase.auth
export var firebaseRef = firebase.database().ref()

// - Firebase default
export default firebase
