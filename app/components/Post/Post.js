// - Import react components
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, Image } from 'react-native'
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
 * @class Home
 * @extends {Component}
 */
export class Post extends Component {

  constructor(props) {
    super(props);
    moment.updateLocale('en', {
    relativeTime : {
        future: "in%s",
        past:   "%s",
        s  : '1s',
        ss : '%ds',
        m:  "1m",
        mm: "%dm",
        h:  "1h",
        hh: "%dh",
        d:  "1d",
        dd: "%dd",
        M:  "1mth",
        MM: "%dmth",
        y:  "1y",
        yy: "%dy"
    }
});
  }
  


  static propTypes = {

    /**
     * The context of a post
     */
    body: PropTypes.string,
    /**
     * The number of comment on a post
     */
    commentCounter: PropTypes.number,
    /**
     * Creation post date
     */
    creationDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
     * Post identifier
     */
    id: PropTypes.string,
    /**
     * Post image address
     */
    image: PropTypes.string,
    /**
     * The last time date when post has was edited
     */
    lastEditDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
     * The name of the user who created the post
     */
    ownerDisplayName: PropTypes.string,
    /**
     * The identifier of the user who created the post
     */
    ownerUserId: PropTypes.string,
    /**
     * The avatar address of the user who created the post
     */
    ownerAvatar: PropTypes.string,
    /**
     * If post is only [0]text, [1]whith picture, ...
     */
    postTypeId: PropTypes.number,
    /**
     * The number votes on a post
     */
    score: PropTypes.number,
    /**
     * Array of tags on a post
     */
    tags: PropTypes.array,
    /**
     * The video address of a post
     */
    video: PropTypes.string,
    /**
     * If it's true comment will be disabled on a post
     */
    disableComments: PropTypes.bool,
    /**
     * If it's true sharing will be disabled on a post
     */
    disableSharing: PropTypes.bool,
    /**
     * The number of users who has visited the post
     */
    viewCount: PropTypes.number
  }

  render() {

    const { body, ownerDisplayName, creationDate,avatar, image, comments, commentCount } = this.props
    return (
      <Animatable.View animation="slideInUp">
        <Card style={styles.post}>

          <CardSection style={styles.header}>
            <Avatar size="30" name={ownerDisplayName} fileName={avatar} />
            <View style={styles.name}>
              <Text style={styles.nameText}>{ownerDisplayName}</Text>

            </View>
            <Text style={styles.dateText}>{moment.unix(creationDate).fromNow()}</Text>

          </CardSection>


            <Img fileName={image} />
        
          <View style={styles.body}>
            <Text style={styles.bodyText}>{body}</Text>
          </View>
          <CardSection style={styles.footer}>

            <View style={styles.footerLeft}>
              <View style={styles.favorite}>
                <Icon name="favorite-border" size={20} style={styles.favoriteIcon} onPress={this.loginWithFacebook} />
              </View>
            </View>
            <View style={styles.footerRight}>
              <View style={styles.comment}>
                <Icon name="comment" size={20} style={styles.commentIcon} onPress={this.loginWithFacebook} />
              </View>
              <View style={styles.share}>
                <Icon name="share" size={20} style={styles.shareIcon} onPress={this.loginWithFacebook} />
              </View>
            </View>
          </CardSection>
        </Card>
         { commentCount > 0 ? <CommentList comments={comments} /> : <Text></Text> }

      </Animatable.View >

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
  const {uid} = state.authorize  
  let votes = state.vote.postVotes[ownProps.id]
  const post = (state.post.userPosts[uid] ? Object.keys(state.post.userPosts[uid]).filter((key)=>{ return ownProps.id === key}).length : 0)
  const avatar = state.user.info && state.user.info[ownProps.ownerUserId] ? state.user.info[ownProps.ownerUserId].avatar || '' : ''
  const comments = state.comment.postComments ? state.comment.postComments[ownProps.id] : {}
  return {
    comments,
    avatar,
    commentCount: comments ? Object.keys(comments).length : 0,
    voteCount: state.vote.postVotes[ownProps.id] ? Object.keys(state.vote.postVotes[ownProps.id]).length : 0,
    userVoteStatus: votes && Object.keys(votes).filter((key) => votes[key].userId === state.authorize.uid)[0] ? true : false,
    isPostOwner: post > 0
  }
}
/**
 * Connect component to redux store
 */
export default connect(mapStateToProps)(Post)
