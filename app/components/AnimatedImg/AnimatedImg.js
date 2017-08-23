// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  Image,
  View,
  Text
} from 'react-native'
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
export class AnimatedImg extends Component {

    static propTypes = {

    /**
     * Use for getting url address from server
     */
    fileName: PropTypes.string,
    /**
     * Avatar style
     */
    style: PropTypes.object
  }

  constructor(props) {
    super(props)


    // Binding functions to `this`
    this.getImageURL = this.getImageURL.bind(this)

  }

  /**
   * Get image url if it is not exist on redux store
   * 
   * @memberof Img
   */
  getImageURL = () => {
    let { fileName } = this.props
    if (fileName && fileName !== '') {
      if (this.props.imageRequests.indexOf(fileName) > -1)
        return
      this.props.getImage(fileName)

    }
  }

  componentWillMount() {
    let { fileName } = this.props
    if (this.props.imageRequests.indexOf(fileName) > -1)
      return
    this.getImageURL()
  }

  render() {

    let { fileName, style } = this.props
    let fileExist = (!this.props.avatarURL[fileName] || this.props.avatarURL[fileName] === '') 
    return (
               <CardSection style={!fileExist ? { padding: 0} : { padding: 0 , height:0}} >
        {fileExist ? <Text></Text> : (<Image style={[styles.image,style]}
        source={{ uri: this.props.avatarURL[fileName] }}
      />)}
      
    </CardSection>
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
export default connect(mapStateToProps, mapDispatchToProps)(AnimatedImg)
