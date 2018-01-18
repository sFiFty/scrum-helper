import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded} from 'react-redux-firebase'
import TeamList from '../components/TeamList/TeamList'

export default compose(
    firebaseConnect(),
    connect(
        (state) => ({
            profile: state.firebase.profile
        })
    )
)(TeamList)

