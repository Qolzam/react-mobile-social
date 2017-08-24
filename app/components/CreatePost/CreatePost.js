// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Platform, View, ScrollView, TextInput, Text, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView } from 'react-native';
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { changeData, dbLogin } from './../../actions'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'
import * as Animatable from 'react-native-animatable'
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer'
import RNFetchBlob from 'react-native-fetch-blob'

// - Import component styles 
import styles from './styles'

// - Import app API
import FileAPI from '../../api/FileAPI'
import PostAPI from '../../api/PostAPI'

// - Import app components
import CommentList from './../CommentList'
import Img from './../Img'
import Avatar from './../Avatar'

// - Import actions
import * as imageGalleryActions from '../../actions/imageGalleryActions'
import * as postActions from '../../actions/postActions'

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

/**
 * Create component class
 * 
 * @export
 * @class Login
 * @extends {Component}
 */
export class CreatePost extends Component {


  /**
   * Navigation options
   * 
   * @static
   * @memberof CreatePost
   */
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const { navigate } = navigation
    return {
      title: 'Create Post',
      headerTintColor: "#616161",
      headerStyle: styles.header,
      headerRight: (<TouchableOpacity onPress={() => params.handleSavePost()}><Icon name="done" color={params.enableSavePost ? '#339dd4' : '#eeeeee'} size={20} style={styles.headerRight} /></TouchableOpacity>)
    }
  }


  /**
   * Creates an instance of CreatePost.
   * @param {any} props 
   * @memberof CreatePost
   */
  constructor(props) {
    super(props)

    this.state = {
      text: '',
      keyboardVisible: false,
      imageSource: null,
      imageHeight: 0,
      imageWidth: 0,
      imageName: '',
      disableComments: false,
      disableSharing: false
    }

  }



  /**
   * Save a post
   * 
   * @memberof CreatePost
   */
  savePost = () => {
    const { navigation, post, avatar, name,saveImageGallery } = this.props
    const { params = {} } = navigation.state

    const { imageSource, text, disableComments, disableSharing } = this.state

    if (!params.enableSavePost) {
      return
    }


    var tags = PostAPI.getContentTags(text)


    if (imageSource !== null) {
      this.handleImage().then((result) => {

        const { image, fileName } = result

        FileAPI.uploadImage(image, fileName, (percent, status) => {
          console.log('============= Upload progress ===============');
          console.log(percent);
          console.log('====================================');
        }).then((result) => {

          /* Save post */
          post({
            body: text,
            tags: tags,
            avatar: avatar,
            name: name,
            disableComments: disableComments,
            disableSharing: disableSharing,
            image: result.downloadURL,
            imageFullPath: result.metadata.fullPath
          })

          /* Add image to image gallery */
          saveImageGallery(result.downloadURL,result.metadata.fullPath)

        })

      }).catch((error) => {
        console.log('=============Error==================');
        console.log(error);
        console.log('====================================');
      })
    }
    else {
      post({
        body: text,
        tags: tags,
        avatar: avatar,
        name: name,
        disableComments: disableComments,
        disableSharing: disableSharing
      })
    }


  }


  /**
   * Resize and conver image
   * 
   * @memberof CreatePost
   */
  handleImage = () => {
    const mime = 'application/octet-stream'
    const { imageHeight, imageWidth, imageName, imageSource } = this.state
    const { saveImage } = this.props

    if (imageSource === null)
      return

    let max_size = 986;
    let width = imageWidth
    let height = imageHeight
    if (width > height) {
      if (width > max_size) {
        height *= max_size / width
        width = max_size;
      }
    } else {
      if (height > max_size) {
        width *= max_size / height
        height = max_size
      }
    }
    return new Promise((resolve, reject) => {
      ImageResizer.createResizedImage(imageSource.uri, width, height, 'JPEG', 80).then((response) => {
        let { uri } = response

        const extension = FileAPI.getExtension(response.name)
        const fileName = (`${uuid()}.${extension}`)
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null


        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((image) => {
            resolve({ image, fileName })
          })

      }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * On Changing input text
   * 
   * @memberof CreatePost
   */
  changeText = (text) => {
    const { navigation } = this.props
    navigation.setParams({ enableSavePost: false })
    this.setState({
      text: text
    })
    navigation.setParams({ enableSavePost: (_.trim(text) !== '') })
  }

  /**
   * Delete post image
   * 
   * @memberof CreatePost
   */
  deleteImage = () => {
    this.setState({
      imageSource: null,
      imageHeight: 0,
      imageWidth: 0,
      imageName: ''
    })
  }

  /**
   * Fire when keboard will be shown
   * 
   * @memberof CreatePost
   */
  keyboardWillShow = (event) => {
    this.setState({
      keyboardVisible: true
    })
  }

  /**
   * Fire when keyboard will be hidden
   * 
   * @memberof CreatePost
   */
  keyboardWillHide = (event) => {
    this.setState({
      keyboardVisible: false
    })


  }


  showGallery = () => {

    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: 'Select an Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };


    /**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageSource: source,
          imageHeight: response.height,
          imageWidth: response.width,
          imageName: response.fileName
        });
      }
    });
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }
  componentDidMount() {
    const { navigation } = this.props
    navigation.setParams({ handleSavePost: this.savePost })
    navigation.setParams({ enableSavePost: false })
  }

  render() {
    const { avatar, name, banner, windowSize } = this.props
    const { keyboardVisible, imageSource, imageHeight } = this.state



    return (

      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <ScrollView>
          <Card>
            <View style={styles.userInfo}>
              <Avatar size="30" name={name || ' '} fileName={avatar} />
              <View style={styles.name}>
                <Text>{name}</Text>
              </View>
            </View>
            <View>
              <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                onChangeText={this.changeText}
                onSubmitEditing={Keyboard.dismiss}
                value={this.state.text}
                placeholder='What is new with you?'
              />
            </View>
            <View style={styles.menu}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => this.showGallery()}>
                <Icon name="photo-camera" size={20} style={styles.cameraIcon} onPress={this.showGallery} />
              </TouchableOpacity>
              {keyboardVisible ? (<TouchableOpacity activeOpacity={0.7} onPress={() => Keyboard.dismiss()}>
                <Icon name="keyboard-hide" size={20} style={styles.keyboardIcon} onPress={this.loginWithFacebook} />
              </TouchableOpacity>) : <Text></Text>}
            </View>
            {imageHeight > 0 ? (<View>
              <TouchableOpacity style={styles.removeImage} activeOpacity={0.7} onPress={() => navigate('CreatePost')}>
                <Icon name="remove-circle" size={20} style={styles.removeImageIcon} onPress={this.deleteImage} />
              </TouchableOpacity>
              <Image style={{ width: null, height: imageHeight < 380 ? imageHeight : 380 }} source={imageSource} />
            </View>) : <Text></Text>}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

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
    deleteImage: (id) => {
      dispatch(imageGalleryActions.dbDeleteImage(id))
    },
    post: (post) => dispatch(postActions.dbAddPost(post)),
    saveImageGallery: (imageURL,imageFullPath) => dispatch(imageGalleryActions.dbSaveImage(imageURL,imageFullPath))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state, ownProps) => {
  const { uid } = state.authorize
  const { windowSize } = state.global
  return {
    avatar: state.user.info && state.user.info[uid] ? state.user.info[uid].avatar || '' : '',
    name: state.user.info && state.user.info[uid] ? state.user.info[uid].fullName || '' : '',
    banner: state.user.info && state.user.info[uid] ? state.user.info[uid].banner || '' : '',
    posts: state.post.userPosts ? state.post.userPosts[uid] : {},
    uid,
    windowSize

  }
}

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
