// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Image,
  View,
  Text
} from 'react-native'
import UserAvatar from 'react-native-user-avatar'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'


// - Import component styles 
import styles from './styles'

// - Import Actions
import * as imageGalleryActions from './../../actions/imageGalleryActions'

/**
 * Create component class
 * 
 * @export
 * @class Home
 * @extends {Component}
 */
export class Avatar extends Component {

    static propTypes = {

    /**
     * Use for getting url address from server
     */
    fileName: PropTypes.string,
    /**
     * User name
     */
    name: PropTypes.string,
    /**
     * Size of avatars
     */
    size: PropTypes.string



  }

  constructor(props) {
    super(props)


    // Binding functions to `this`

  }

  /**
   * Get image url if it is not exist on redux store
   * 
   * @memberof Img
   */
  getImageURL = () => {
    let { fileName, getImage, imageRequests } = this.props
             
    if (fileName && fileName !== '') {
      if (imageRequests.indexOf(fileName) > -1)
        return
      getImage(fileName)

    }
  }

  componentWillMount() {
    let { fileName, imageRequests} = this.props
  
    if (imageRequests.indexOf(fileName) > -1)
      return
    this.getImageURL()
  }

  render() {

    let { fileName, size, name, avatarURL, style} = this.props

    let fileNotExist = (!avatarURL[fileName] || avatarURL[fileName] === '') 

    return (
      <UserAvatar size={size} name={name} src={avatarURL[fileName]} style={style}/>
    )

  }
}



/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getImage: (name) => dispatch(imageGalleryActions.dbDownloadImage(name))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
  return {
    avatarURL: state.imageGallery.imageURLList,
    imageRequests: state.imageGallery.imageRequests
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Avatar)
