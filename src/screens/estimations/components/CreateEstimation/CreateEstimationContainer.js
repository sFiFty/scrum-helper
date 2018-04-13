import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import CreateEstimation from './CreateEstimation'

export default compose(
  firebaseConnect(),
  connect()
)(CreateEstimation)

