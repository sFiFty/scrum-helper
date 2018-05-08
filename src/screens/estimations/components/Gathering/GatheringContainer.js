import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, populate} from 'react-redux-firebase'
import Gathering from './Gathering'

export default compose(
	firebaseConnect((props, state) => {
		estimationId = props.estimationid
		return [
      { 
				path: `estimationMeetings/${estimationId}`, 
				storeAs: 'estimation',
				populates
			}
		]
	}),
	connect((state, props) => ({
		estimation: populate(state.firebase, 'estimation', populates),
		estimationId: props.estimationId,
		auth: state.firebase.auth
  }))
)(Gathering)

