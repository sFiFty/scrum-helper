import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import Shuffling from '../components/ScrumDaily/Shuffling'

export default compose(
    firebaseConnect((props, store) => {
        return [
            { 
                path: `/teams/${store.getState().firebase.profile.teamId}/employees`,
                storeAs: 'myEmployees'  
            }
        ]
    }),
    connect(
        (state) => ({
            employees: state.firebase.data.myEmployees,
        })
    )
)(Shuffling)