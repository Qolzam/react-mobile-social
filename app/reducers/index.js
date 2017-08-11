// - Import react components
import { combineReducers } from 'redux'

// - Import reducers
import {imageGalleryReducer} from './imageGalleryReducer'
import {imageUploaderReducer} from './imageUploaderReducer'
import {postReducer} from './postReducer'
import {commentReducer} from './commentReducer'
import {voteReducer} from './voteReducer'
import {authorizeReducer} from './authorizeReducer'
import {fileReducer} from './fileReducer'
import {globalReducer} from './globalReducer'
import {userReducer} from './userReducer'
import {notifyReducer} from './notifyReducer'
import {circleReducer} from './circleReducer'
import {navReducer} from './navReducer'



export default combineReducers({
  nav: navReducer,
  imageGallery: imageGalleryReducer,
  imageUploader: imageUploaderReducer,
  post: postReducer,
  comment: commentReducer,
  vote: voteReducer,
  authorize: authorizeReducer,
  file: fileReducer,
  global: globalReducer,
  user: userReducer,
  notify: notifyReducer,
  circle: circleReducer
})
