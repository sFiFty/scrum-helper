import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect, populate} from 'react-redux-firebase'
import Estimation from './Estimation'

const populates = [
  {child: 'team', root: 'teams', keyProp: 'key'} 
]

let estimationId

export default compose(
	firebaseConnect((props, state) => {
		estimationId = props.match.params.estimationid
		return [
      { 
				path: `estimationMeetings/${estimationId}`, 
				storeAs: 'estimation',
				populates
			}
		]
	}),
	connect(state => ({
    estimation: populate(state.firebase, 'estimation', populates),
    estimationId: estimationId
  }))
)(Estimation)

