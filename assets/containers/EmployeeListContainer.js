import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, dataToJS } from 'react-redux-firebase'
import EmployeeList from '../components/EmployeeList/EmployeeList'

export default compose(
    firebaseConnect((props, state) => {
        return [
            { path: '/employees' }
        ]
    }),
    connect(
        (state) => ({
            employees: state.firebase.data.employees,
        })
    )
)(EmployeeList)

