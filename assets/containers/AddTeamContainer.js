import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import AddTeam from '../components/AddTeam/AddTeam'

export default compose(
    firebaseConnect(),
    connect(
        (state) => ({
            profile: state.firebase.profile
        })
    )
)(AddTeam)

