import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import TeamProfile from './TeamProfile.jsx';

export default compose(
  firebaseConnect(({ match }) => [
    {
      path: `teams/${match.params.teamid}`,
      storeAs: 'team',
    },
  ]),
  connect(state => ({
    team: state.firebase.data.team,
    owner: state.firebase.auth.uid,
  })),
)(TeamProfile);
