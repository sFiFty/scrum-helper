import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import Gathering from './Gathering';

const populates = [
  { child: 'team', root: 'teams', keyProp: 'key' },
];

export default compose(
  firebaseConnect((props, state) => [
    {
      path: `estimationMeetings/${props.match.params.estimationid}`,
      storeAs: 'estimation',
      populates,
    },
  ]),
  connect((state, props) => ({
    estimation: populate(state.firebase, 'estimation', populates),
    estimationId: props.match.params.estimationid,
    auth: state.firebase.auth,
  })),
)(Gathering);
