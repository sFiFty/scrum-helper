import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import Auth from './Auth'

export default compose(
  firebaseConnect(),
  connect(({firebase: {auth}}) => ({auth}))
)(Auth)