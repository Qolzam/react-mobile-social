// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  Animated
} from 'react-native'
import UserAvatar from 'react-native-user-avatar'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'


// - Import component styles 
import styles from './styles'

// - Import actions
import * as userActions from './../../actions/userActions'
import * as commentActions from './../../actions/commentActions'

// - Import app components
import Avatar from './../Avatar'

/**
 * Create component class
 * 
 * @export
 * @class Home
 * @extends {Component}
 */
export class CommentShow extends Component {

  static propTypes = {

    /**
     * Comment
     */
    comment: PropTypes.object
  }

  /**
   * Creates an instance of CommentShow.
   * @param {any} props 
   * @memberof CommentShow
   */
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { userId } = this.props.comment
    if (!this.props.isCommentOwner && !this.props.info[userId]) {
      this.props.getUserInfo()
    }
  }

  render() {
    const { animatedValue, animatedkey, comment, avatar } = this.props

    return (
      <Animated.View style={[styles.commentShow,{ opacity: animatedValue}]}>
        <Avatar size="25" name={comment.userDisplayName} fileName={avatar} />
        <View style={styles.content}>
          <Text style={styles.name}>{comment.userDisplayName}</Text>
          <View style={styles.textLayout}>
            <Text style={styles.text} numberOfLines={1}>
              {comment.text}
            </Text>
          </View>
        </View>
      </Animated.View>
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
    delete: (id, postId) => dispatch(commentActions.dbDeleteComment(id, postId)),
    update: (id, postId, comment) => dispatch(commentActions.dbUpdateComment(id, postId, comment)),
    openEditor: () => dispatch(commentActions.openCommentEditor({ id: ownProps.comment.id, postId: ownProps.comment.postId })),
    closeEditor: () => dispatch(commentActions.closeCommentEditor({ id: ownProps.comment.id, postId: ownProps.comment.postId })),
    getUserInfo: () => dispatch(userActions.dbGetUserInfoByUserId(ownProps.comment.userId))
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
  const avatar = state.user.info && state.user.info[ownProps.comment.userId] ? state.user.info[ownProps.comment.userId].avatar || '' : ''
  return {
    uid: uid,
    isCommentOwner: (uid === ownProps.comment.userId),
    info: state.user.info,
    avatar


  }
}
/**
 * Connect component to redux store
 */
export default connect(mapStateToProps, mapDispatchToProps)(CommentShow)
