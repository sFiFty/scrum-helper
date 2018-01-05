import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import ScrumDailyCreation from '../components/ScrumDaily/ScrumDailyCreation'

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
            profile: state.firebase.profile
        })
    )
)(ScrumDailyCreation)