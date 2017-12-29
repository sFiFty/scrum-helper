import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import EmployeeList from '../components/EmployeeList/EmployeeList'

export default compose(
    firebaseConnect((props, store) => {
        console.log(    isLoaded(store.getState().firebase.profile))
        return [
            { 
                path: `/teams/${store.getState().firebase.profile.teamId}/employees`,
                storeAs: 'employees'  
            }
        ]
    }),
    connect(
        (state) => ({
            employees: state.firebase.data.employees,
            profile: state.firebase.profile
        })
    )
)(EmployeeList)

