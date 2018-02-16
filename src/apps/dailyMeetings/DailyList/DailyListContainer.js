import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import DailyList from './DailyList'

export default compose(
	firebaseConnect((props, state) => {
		return [
      { 
        path: 'dailyMeetings', 
        queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
        storeAs: 'myMeetings'
      }
		]
	}),
	connect(
		(state) => ({
	  	meetings: state.firebase.data.myMeetings
		})
	)
)(DailyList)

