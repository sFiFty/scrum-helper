import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import EmailModal from './EmailModal'

export default compose(
  firebaseConnect(),
  connect(({firebase: {profile}}) => ({profile}))
)(EmailModal)