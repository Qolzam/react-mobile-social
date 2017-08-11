// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  View,
  Text,
  Image,
  Animated,
  Easing
} from 'react-native'
import { changeData, dbLogin } from './../../actions'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'


// - Import app components
import CommentShow from './../CommentShow'


// - Import component styles 
import styles from './styles'



/**
 * Create component class
 * 
 * @export
 * @class Home
 * @extends {Component}
 */
export class CommentList extends Component {


  static propTypes = {

    /**
     * Comments 
     */
    comments: PropTypes.object
  }

  /**
   * Creates an instance of CommentList.
   * @param {any} props 
   * @memberof CommentList
   */
  constructor(props) {
    super(props)

    const { comments } = props

    this.animatedValue = []
    for (var index = 1; index < (Object.keys(comments).length + 1); index++) {
      this.animatedValue[index] = new Animated.Value(0)

    }

  }

  animation = () => {

    const { comments } = this.props

    let animationList = []
    Object.keys(comments).forEach((item, index) => {
      animationList.push(Animated.timing(this.animatedValue[index+1], {
        toValue: 1,
        duration: 1000
      }))
      animationList.push(Animated.timing(this.animatedValue[index+1], {
        toValue: 0,
        duration: 1000,
        delay: 1000
      }))
    })
    Animated.sequence(animationList).start(() => this.animation())


  }

  fetchComments = () =>{
    const { comments } = this.props
    let index = 0
   return _.map(comments,(comment, key) => {
     index++
      return  <CommentShow key={key} comment={comment} animatedValue={this.animatedValue[index]} animatedkey={index} />
      
      
    })

   
  }

  componentDidMount() {
    this.animation()
  }

  

  render() {

    return (
      <Card style={styles.cotainer}>
          {this.fetchComments()}  
      </Card>
    )
  }
}

/**
 * Map state to props
 * @param {object} param0 
 */
const mapStateToProps = () => {

  return {}
}

/**
 * Connect component to redux store
 */
export default connect(mapStateToProps, {

})(CommentList)
