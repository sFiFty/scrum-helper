import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, populate} from 'react-redux-firebase'
import Meetings from './Meetings'

const populates = [
  {child: 'team', root: 'teams', keyProp: 'key'},
  {child: 'owner', root: 'users', keyProp: 'key'},
]


export default compose(
	firebaseConnect((props, state) => {
		return [
      { 
        path: 'dailyMeetings', 
        queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
				populates
      },
      { 
        path: 'estimationMeetings', 
        queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
				populates
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

