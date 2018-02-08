import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import MemberListInTheTeam from '../components/TeamList/MemberListInTheTeam'


export default compose(
    firebaseConnect(['teams']),
    connect(
        (state) => ({
            teams: state.firebase.data.teams,
        })
    )
)(MemberListInTheTeam)

