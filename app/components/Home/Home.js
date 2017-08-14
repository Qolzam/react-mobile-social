// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Slider, ScrollView, View, Text, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
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
import WritePostButton from './../WritePostButton'

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
        <Icon name="home" size={26} style={[styles.tabIcon,{color: tintColor}]} />
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
          <WritePostButton openRequest={() => navigate('CreatePost')}/>
          {!loaded
            ? (<View style={styles.spinnerLoding}>
              <Spinner size="small" />
              <Text style={styles.textLoading}> Your data is loading ...</Text>
            </View>)
            : this.fetchPosts()}
        </ScrollView>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigate('CreatePost')}>
          <View style={styles.createPostLayout}>
            <Icon name="create" size={30} style={styles.createPostIcon} onPress={this.loginWithFacebook} />
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
