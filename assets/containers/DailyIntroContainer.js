import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import Intro from '../components/ScrumDaily/Intro'

export default compose(
    firebaseConnect(['employees']),
        connect( state => ({
            employees: state.firebase.data.employees,
        })
    )
)(Intro)