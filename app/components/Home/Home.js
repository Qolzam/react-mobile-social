// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Slider, ScrollView, View, Text, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import UserAvatar from 'react-native-user-avatar'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { changeData, dbLogin } from './../../actions'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'
import * as Animatable from 'react-native-animatable'

// - Import Actions
import * as globalActions from './../../actions/globalActions'
import * as postActions from './../../actions/postActions'
import * as userActions from './../../actions/userActions'
import * as commentActions from './../../actions/commentActions'
import * as voteActions from './../../actions/voteActions'
import * as notifyActions from './../../actions/notifyActions'
import * as circleActions from './../../actions/circleActions'
import * as imageGalleryActions from './../../actions/imageGalleryActions'


// - Import API 
import CircleAPI from './../../api/CircleAPI'
import PostAPI from './../../api/PostAPI'

// - Import app components
import Post from './../Post'
import Avatar from './../Avatar'

// - Import component styles 
import styles from './styles'

/**
 * Create component class
 * 
 * @export
 * @class Home
 * @extends {Component}
 */
export class Home extends Component {


  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state
    const { navigate } = navigation
    return {
      title: 'Home',
      headerTintColor: "#616161",
      headerStyle: {
        backgroundColor: "#ffffff"
      },
      // headerRight: (<TouchableOpacity onPress={() => navigate('CreatePost')}><Icon name="create" size={20} style={{ marginRight: 10 }} /></TouchableOpacity>),
      tabBarLabel: 'Home',
      // Note: By default the icon is only shown on iOS. Search the showIcon option below.
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={26} style={{ color: tintColor, backgroundColor: "transparent" }} />
      )

    }
  }

  /**
   * Creates an instance of Home.
   * @param {any} props 
   * @memberof Home
   */
  constructor(props) {
    super(props)

  }

  saveDetails() {
    const { navigate } = this.props.navigation;
    NavigationActions.navigate({ routeName: 'Profile' })
  }

  fetchPosts = () => {
    const { mergedPosts } = this.props
    const posts = PostAPI.sortObjectsDate(mergedPosts)
    return _.map(posts, (post, index) => {

      return <Post
        body={post.body}
        commentCounter={post.commentCounter}
        creationDate={post.creationDate}
        id={post.id}
        key={post.id}
        image={post.image}
        lastEditDate={post.lastEditDate}
        ownerDisplayName={post.ownerDisplayName}
        ownerUserId={post.ownerUserId}
        ownerAvatar={post.ownerAvatar}
        postTypeId={post.postTypeId}
        score={post.score}
        tags={post.tags}
        video={post.video}
        disableComments={post.disableComments}
        disableSharing={post.disableSharing}
        viewCount={post.viewCount}
        pictureState={true} />
    })
  }

  componentWillMount() {
    const { loadData } = this.props
    loadData()
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.saveDetails })
  }


  render() {
    const { loaded, navigation, name, avatar } = this.props
    const { navigate } = navigation

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('CreatePost')}>
          <Card >
            <View style={{ flexDirection: 'row', padding: 8 }}>
              <Avatar size="30" name={name || ' '} fileName={avatar} />
              <View style={{ display: 'flex', flex: 1, flexDirection: 'column', marginLeft: 10, paddingTop: 5, paddingBottom: 5 }}>
                <Text style={{ fontWeight: '100', fontSize: 15, color: '#9e9e9e' }}>What is new with you?</Text>
              </View>
              <View style={{ backgroundColor: '#eeeeee', borderRadius: (33 * 0.5), width: 33, height: 33 }}>
                <Icon name="photo-camera" size={20} style={{ color: '#757575', margin: 7, backgroundColor: "transparent" }} onPress={this.loginWithFacebook} />
              </View>
            </View>
          </Card>
          </TouchableOpacity>
          {!loaded
            ? (<View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100

            }}>
              <Spinner size="small" />
              <Text style={{ marginTop: 10 }}> Your data is loading ...</Text>
            </View>)
            : this.fetchPosts()}
        </ScrollView>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('CreatePost')}>
          <View style={{ bottom: 8, right: 8, backgroundColor: '#4CAF50', borderRadius: (44 * 0.5), width: 44, height: 44, marginLeft: 8, position: 'absolute' }}>
            <Icon name="create" size={30} style={{ color: '#ffffff', margin: 7, backgroundColor: "transparent" }} onPress={this.loginWithFacebook} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    loadData: () => {
      dispatch(commentActions.dbGetComments())
      dispatch(imageGalleryActions.downloadForImageGallery())
      dispatch(postActions.dbGetPosts())
      dispatch(userActions.dbGetUserInfo())
      dispatch(voteActions.dbGetVotes())
      dispatch(notifyActions.dbGetNotifies())
      dispatch(circleActions.dbGetCircles())

    },
    clearData: () => {
      dispatch(imageGalleryActions.clearAllData())
      dispatch(postActions.clearAllData())
      dispatch(userActions.clearAllData())
      dispatch(commentActions.clearAllComments())
      dispatch(voteActions.clearAllvotes())
      dispatch(notifyActions.clearAllNotifications())
      dispatch(circleActions.clearAllCircles())

    }
  }

}

/**
 * Map state to props
 * @param {object} param0 
 */
const mapStateToProps = ({ authorize, global, user, post, comment, imageGallery, vote, notify, circle }) => {
  const { uid } = authorize
  let mergedPosts = {}
  const circles = circle ? (circle.userCircles[uid] || {}) : {}
  const followingUsers = CircleAPI.getFollowingUsers(circles)
  const posts = post.userPosts ? post.userPosts[uid] : {}
  Object.keys(followingUsers).forEach((userId) => {
    let newPosts = post.userPosts ? post.userPosts[userId] : {}
    _.merge(mergedPosts, newPosts)
  })
  _.merge(mergedPosts, posts)
  const loaded = user.loaded && post.loaded && comment.loaded && imageGallery.loaded && vote.loaded && notify.loaded && circle.loaded

  return {
    mergedPosts,
    guest: authorize.guest,
    name: user.info && user.info[uid] ? user.info[uid].fullName || '' : '',
    avatar: user.info && user.info[uid] ? user.info[uid].avatar || '' : '',
    authed: authorize.authed,
    progress: global.progress,
    global: global,
    loaded,
    uid
  }
}

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home)
