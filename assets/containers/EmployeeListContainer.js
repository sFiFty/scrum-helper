import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import EmployeeList from '../components/EmployeeList/EmployeeList'

export default compose(
    firebaseConnect((props, store) => {
        return [
            { 
                path: `/teams/${store.getState().firebase.profile.teamId}`,
                storeAs: 'myTeam'  
            }
        ]
    }),
    connect(
        (state) => ({
            team: state.firebase.data.myTeam,
            profile: state.firebase.profile
        })
    )
)(EmployeeList)

