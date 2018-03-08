import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded} from 'react-redux-firebase'
import CoreLayout from './CoreLayout'

export default compose(
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile
  }))
)(CoreLayout)

