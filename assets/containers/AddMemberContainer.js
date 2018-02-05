import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import AddMember from '../components/AddMember/AddMember'

export default compose(
    firebaseConnect(),
    connect(
        (state) => ({
            profile: state.firebase.profile
        })
    )
)(AddMember)

