import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import TeamList from '../components/TeamList/TeamList'

export default compose(
    firebaseConnect(['teams']),
    connect(({ firebase }) => ({
        teams: firebase.data.teams,
        uid: firebase.auth.uid
    }))
)(TeamList)

