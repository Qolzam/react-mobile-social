// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, Image, ScrollView } from 'react-native'
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
export class Profile extends Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const { navigate } = navigation
    return {
      title: 'Profile',
      headerTintColor: "#ffffff",
      headerStyle: {
        backgroundColor: "#4CAF50"
      },
      tabBarLabel: 'Profile',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: ({ tintColor }) => (
        <Icon name="account-circle" size={26} style={{ color: tintColor, backgroundColor: "transparent" }} />
      )

    }
  }

  render() {
    const { avatar, name, tagLine, banner, windowSize } = this.props
    return (
      <View style={styles.profile}>
        <ScrollView>
          <View style={styles.banner}>
            <Img fileName={banner} />
          </View>
          <View style={styles.avatarLayout}>
            <View style={[styles.avatarContainer,{left: (windowSize.width * 0.5) - 40}]}>
              <Avatar size="70" name={name || 'O'} fileName={avatar} style={styles.avatar} />
            </View>
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{name}</Text>
          </View>
          <View style={styles.tagLine}>
            <Text style={styles.tagLineText}>{tagLine}</Text>
          </View>


        </ScrollView>

      </View>
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
  const userId = uid
  return {
    avatar: state.user.info && state.user.info[userId] ? state.user.info[userId].avatar || '' : '',
    name: state.user.info && state.user.info[userId] ? state.user.info[userId].fullName || '' : '',
    tagLine: state.user.info && state.user.info[userId] ? state.user.info[userId].tagLine || '' : '',
    banner: state.user.info && state.user.info[userId] ? state.user.info[userId].banner || '' : '',
    posts: state.post.userPosts ? state.post.userPosts[userId] : {},
    isAuthedUser: userId === uid,
    userId,
    windowSize

  }
}

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps)(Profile)
