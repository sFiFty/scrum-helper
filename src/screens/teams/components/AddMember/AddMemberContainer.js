import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import AddMember from './AddMember.jsx';

export default compose(
  firebaseConnect(({ match }) => [
    {
      path: `teams/${match.params.teamid}`,
      storeAs: 'team',
    },
  ]),
  connect(
    state => ({
      team: state.firebase.data.team,
    }),
  ),
)(AddMember);
