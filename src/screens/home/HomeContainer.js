import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import Home from './Home'

export default compose(
  firebaseConnect(),
  connect(({firebase: {auth}}) => ({auth}))
)(Home)