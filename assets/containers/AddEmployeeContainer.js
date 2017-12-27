import React from 'react'
import AddEmployee from '../components/AddEmployee/AddEmployee'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

export default compose(
    firebaseConnect((props) => {
        return [
            'users'
        ]
    }),
    connect(
        (state) => ({
            employees: state.firebase.data.users,
            profile: state.firebase.profile
        })
    )
)(AddEmployee)