import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, populate } from 'react-redux-firebase';

import Daily from './Daily.jsx';

const populates = [
  { child: 'team', root: 'teams', keyProp: 'key' },
];

let dailyId;

export default compose(
  firebaseConnect(({ match }) => {
    dailyId = match.params.dailyid;
    return [
      {
        path: `dailyMeetings/${dailyId}`,
        storeAs: 'daily',
        populates,
      },
    ];
  }),
  connect(
    state => ({
      daily: populate(state.firebase, 'daily', populates),
      dailyId,
    }),
  ),
)(Daily);
