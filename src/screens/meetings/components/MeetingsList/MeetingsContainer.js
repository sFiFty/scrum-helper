import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, populate} from 'react-redux-firebase'
import Meetings from './Meetings'

const dailyPopulates = [
  {child: 'team', root: 'teams', keyProp: 'key'} 
]

const estimationPopulates = [
  {child: 'team', root: 'teams', keyProp: 'key'} 
]

export default compose(
	firebaseConnect((props, state) => {
		return [
      { 
        path: 'dailyMeetings', 
        queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
				dailyPopulates
      },
      { 
        path: 'estimationMeetings', 
        queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
				estimationPopulates
			}
		]
	}),
	connect(
		(state) => ({
      dailyMeetings: populate(state.firebase, 'dailyMeetings', populates),
      estimationMeetings: populate(state.firebase, 'estimationMeetings', populates),
		})
	)
)(Meetings)

