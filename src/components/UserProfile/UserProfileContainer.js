import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import UserProfile from './UserProfile'

export default compose(
	firebaseConnect(),
	connect(
		(state) => ({
			profile: state.firebase.profile
		})
	)
)(UserProfile)