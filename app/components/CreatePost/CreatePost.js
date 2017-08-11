// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, Image, TextInput, Keyboard } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { changeData, dbLogin } from './../../actions'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'
import * as Animatable from 'react-native-animatable'

// - Import component styles 
import styles from './styles'

// - Import app components
import CommentList from './../CommentList'
import Img from './../Img'
import Avatar from './../Avatar'

/**
 * Create component class
 * 
 * @export
 * @class Login
 * @extends {Component}
 */
export class CreatePost extends Component {

  /**
   * Creates an instance of CreatePost.
   * @param {any} props 
   * @memberof CreatePost
   */
  constructor(props) {
    super(props)

    
    this.state = { 
      text: 'What is new with you?',
      postHeight: null
     }
  }

  changeText = (text) => {

    this.setState({
      text: text
    })
  }

  keyboardWillShow(evt) {
    const {windowSize} = this.props
    let newSize =( windowSize.height - evt.endCoordinates.height) - 74
    this.setState({
      postHeight: newSize
    })
  }

  keyboardWillHide(evt) {
    const {windowSize} = this.props    
    this.setState({
      postHeight: windowSize.height,
    })
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }



  render() {
    const { avatar, name, banner } = this.props
    const {postHeight} = this.state
    return (

      <Card style={{ height: postHeight }}>
        <View style={{ flexDirection: 'row', padding: 8 }}>
          <Avatar size="30" name={name || ' '} fileName={avatar} />
          <View style={{ display: 'flex', flex: 1, flexDirection: 'column', marginLeft: 10, paddingTop: 5, paddingBottom: 5 }}>
            <Text style={{}}>{name}</Text>
          </View>
        </View>
        <View>
          <TextInput
            style={{ height: 50, padding: 5 }}
            multiline={true}
            numberOfLines={4}
            onChangeText={this.changeText}
            onSubmitEditing={Keyboard.dismiss}
            value={this.state.text}
          />
        </View>
        <Text style={{position:'absolute', bottom:0}}>Hello </Text>
      </Card>


    )
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
export default connect(mapStateToProps, null)(CreatePost)
