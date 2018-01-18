import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import AddNewTeam from '../components/AddNewTeam/AddNewTeam'

export default compose(
    firebaseConnect(),
    connect(
        (state) => ({
            profile: state.firebase.profile
        })
    )
)(AddNewTeam)

