import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import Header from 'Components/Header'

export default compose(
	firebaseConnect((props) => {
		return [
			{
			  path: `/storage`,
			},
		]
	}),
	connect(
		(state) => ({
			logo: state.firebase.storage,
		})
	)
)(Header)