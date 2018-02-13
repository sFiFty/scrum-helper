import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, isLoaded} from 'react-redux-firebase'
import App from 'Components/App'

export default compose(
    firebaseConnect(['employees']),
    connect( state => ({
        profile: state.firebase.profile,
    })
    )
)(App)

