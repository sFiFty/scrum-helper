import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import Auth from '../components/Auth/Auth'

export default compose(
    firebaseConnect(['users']),
        connect( state => ({
            users: state.firebase.data.users,
        })
    )
)(Auth)