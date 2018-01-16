import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import EmailConfirmation from '../components/EmailConfirmation/EmailConfirmation'

export default compose(
    firebaseConnect(), 
    connect(({ firebase: { profile } }) => ({ profile }))
)(EmailConfirmation)