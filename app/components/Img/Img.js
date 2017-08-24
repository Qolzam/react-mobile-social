// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {CustomCachedImage} from "react-native-img-cache"
import Image from 'react-native-image-progress'
import ProgressBar from 'react-native-progress/Bar'
import {
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
export class Img extends Component {

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


  }

 

  render() {

    let { fileName, style } = this.props
     return (
          <CustomCachedImage
          component={Image} 
          style={[styles.image, style]}
          indicator={ProgressBar.Pie} 
          source={{ uri: fileName }}
        />
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
export default connect(mapStateToProps, mapDispatchToProps)(Img)
