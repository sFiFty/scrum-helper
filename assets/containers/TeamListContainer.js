import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded, populate} from 'react-redux-firebase'
import TeamList from '../components/TeamList/TeamList'

const populates = [
    { child: 'id', root: 'teams' }
  ]

export default compose(
    firebaseConnect((props, store) => {
        return [
            { 
                path: `users/${store.getState().firebase.auth.uid}/teams`,
                populates,
            }
        ]
    }),
    connect(
        (state) => ({
            profile: state.firebase.profile,
            myTeams: populate(state.firebase, 'teams', populates)
        })
    )
)(TeamList)

