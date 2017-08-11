// - Import action types
import * as types from './../constants/actionTypes'


/**
 * Default state
 */
var defaultState = {
  percent: '',
  visible: false,
  loading: false,
  defaultLoadDataStatus: false,
  messageOpen: false,
  error: '',
  sidebarMainStyle: {},
  sidebarStyle: { width: "210px" },
  sidebarClass: "",
  sidebarOpen: (window.innerWidth > 750) ? true : false,
  windowWidth: 0,
  windowHeight: 0,
  overSidebarStatus: false,
  onResizeOpenSidebar: false,
  sidebarAuto: false,
  headerTitle: '',
  editProfileOpen: false,
  changeData: {
    inputs: {},
    error: '',
    loading: false
  },
  windowSize:{}

}


/**
 * Global reducer
 * @param {object} state 
 * @param {object} action 
 */
export const globalReducer = (state = defaultState, action) => {
  const { payload } = action
  switch (action.type) {
    case types.PROGRESS_CHANGE:
      return {
        ...state,
        percent: action.percent,
        visible: action.visible
      }
    case types.DEFAULT_DATA_DISABLE:
      return {
        ...state,
        defaultLoadDataStatus: false
      }
    case types.DEFAULT_DATA_ENABLE:
      return {
        ...state,
        defaultLoadDataStatus: true
      }
    case types.SHOW_ERROR_MESSAGE_GLOBAL:
      return {
        ...state,
        error: action.payload,
        messageOpen: true
      }
    case types.SHOW_NORMAL_MESSAGE_GLOBAL:
      return {
        ...state,
        error: action.payload,
        messageOpen: true
      }
    case types.SHOW_SEND_REQUEST_MESSAGE_GLOBAL:
      return {
        ...state,
        error: "Request has been sent",
        messageOpen: true
      }
    case types.SHOW_REQUEST_SUCCESS_MESSAGE_GLOBAL:
      return {
        ...state,
        error: "Your request has processed successfuly",
        messageOpen: true
      }
    case types.HIDE_MESSAGE_GLOBAL:
      return {
        ...state,
        error: '',
        messageOpen: false,
        messageColor: ''
      }
    case types.SET_HEADER_TITLE:
      return {
        ...state,
        headerTitle: action.payload
      }
    case types.CLOSE_EDIT_PROFILE:
      return {
        ...state,
        editProfileOpen: false
      }

    case types.OPEN_EDIT_PROFILE:
      return {
        ...state,
        editProfileOpen: true
      }
    case types.SHOW_LOADING:
      return {
        ...state,
        loading: true
      }
    case types.HIDE_LOADING:
      return {
        ...state,
        loading: false
      }
    case types.CHANGE_DATA:
      return {
        ...state,
        changeData: {
          ...state.changeData,
          ...payload
        }
      }
    case types.CHANGE_WINDOW_SIZE:
      return {
        ...state,
        windowSize: {
          ...payload
        }
      }

    default:
      return state
  }



}
