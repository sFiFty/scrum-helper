import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import CreateDaily from './CreateDaily'

export default compose(
	firebaseConnect((props, state) => {
		return [
      { 
        path: 'teams', 
        queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
        storeAs: 'myTeams'
      }
		]
	}),
  connect(
    (state) => ({
      teams: state.firebase.data.myTeams,
      owner: state.firebase.auth.uid
    })
  )
)(CreateDaily)

