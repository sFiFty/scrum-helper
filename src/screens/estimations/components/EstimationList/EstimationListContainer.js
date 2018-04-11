import {connect} from 'react-redux'
import {compose} from 'redux'
import {firebaseConnect} from 'react-redux-firebase'
import EstimationList from './EstimationList'

export default compose(
	firebaseConnect(),
  connect(
    (state) => (
      {
        profile: state.firebase.profile
      }
    )
  )
)(EstimationList)