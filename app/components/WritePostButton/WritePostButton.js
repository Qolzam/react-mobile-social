// - Import react components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native'
import { Card, CardSection, Input, Button, Spinner } from './../../layouts'


// - Import component styles 
import styles from './styles'

// - Import app components
import Avatar from './../Avatar'

/**
 * Create component class
 * 
 * @export
 * @class Home
 * @extends {Component}
 */
export class WritePostButton extends Component {

  static propTypes = {
    
        /**
         * A call back function for opening the write post page
         */
        openRequest: PropTypes.func
      }

  constructor(props) {
    super(props)

  }

  render() {

    let { name, avatar, openRequest } = this.props
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={openRequest}>
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
    )

  }
}



/**
 * Map state to props
 * @param {object} param0 
 */
const mapStateToProps = ({ authorize, global, user, post, comment, imageGallery, vote, notify, circle }) => {
  const { uid } = authorize

  return {
    name: user.info && user.info[uid] ? user.info[uid].fullName || '' : '',
    avatar: user.info && user.info[uid] ? user.info[uid].avatar || '' : '',
    authed: authorize.authed,
    global: global,
    uid
  }
}
// - Connect component to redux store
export default connect(mapStateToProps)(WritePostButton)
