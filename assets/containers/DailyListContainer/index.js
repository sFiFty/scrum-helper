import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import DailyList from 'Components/DailyList'

export default compose(
  firebaseConnect(['dailyMeetings']),
  connect(({ firebase }) => ({
    meetings: firebase.data.dailyMeetings,
    uid: firebase.auth.uid
  }))
)(DailyList)

