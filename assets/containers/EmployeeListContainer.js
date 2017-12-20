import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import EmployeeList from '../components/Employees/EmployeeList'

export default compose(
    firebaseConnect(['employees']),
        connect( state => ({
            employees: state.firebase.data.employees,
        })
    )
)(EmployeeList)