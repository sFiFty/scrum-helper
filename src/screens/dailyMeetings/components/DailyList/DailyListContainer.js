import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, populate } from 'react-redux-firebase';

import DailyList from './DailyList';

const populates = [
  { child: 'team', root: 'teams', keyProp: 'key' },
];

export default compose(
  firebaseConnect((props, state) => [
    {
      path: 'dailyMeetings',
      queryParams: ['orderByChild=owner', `equalTo=${state.getState().firebase.auth.uid}`],
      populates,
    },
  ]),
  connect(
    state => ({
      meetings: populate(state.firebase, 'dailyMeetings', populates),
    }),
  ),
)(DailyList);
