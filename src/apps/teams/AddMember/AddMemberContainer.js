import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import AddMember from './AddMember'

export default compose(
  firebaseConnect((props, store) => {
    return [
      { 
        path: `teams/${props.match.params.teamid}`,
        storeAs: 'team'
      }
    ]
  }),
  connect(
    (state) => ({
      team: state.firebase.data.team
    })
  )
)(AddMember)

