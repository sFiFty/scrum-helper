import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import EmployeeList from '../components/EmployeeList/EmployeeList'

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
)(EmployeeList)

