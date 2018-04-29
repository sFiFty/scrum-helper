import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, populate} from 'react-redux-firebase'
import EstimationList from './EstimationList'

const populates = [
  {child: 'team', root: 'teams', keyProp: 'key'} 
]

export default compose(
	firebaseConnect((props, state) => {
		return [
      { 
        path: 'estimationMeetings', 
        queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
				populates
			}
		]
	}),
	connect(
		(state) => ({
			estimations: populate(state.firebase, 'estimationMeetings', populates),
		})
	)
)(EstimationList)

