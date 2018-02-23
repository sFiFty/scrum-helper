import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, populate} from 'react-redux-firebase'
import Daily from './Daily'

const populates = [
  {child: 'team', root: 'teams'} 
]
let dailyid
export default compose(
	firebaseConnect((props, state) => {
		dailyid = props.match.params.dailyid
		return [
      { 
				path: `dailyMeetings/${dailyid}`, 
				storeAs: 'daily',
				populates
			}
		]
	}),
	connect(
		(state) => ({
			daily: populate(state.firebase, `daily`, populates),
		})
	)
)(Daily)

