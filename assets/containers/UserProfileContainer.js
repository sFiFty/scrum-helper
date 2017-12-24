import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import UserProfile from '../components/UserProfile/UserProfile'

export default compose(
    firebaseConnect(['users']),
        connect( state => ({
            users: state.firebase.data.users,
        })
    )
)(UserProfile)