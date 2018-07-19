import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import AddTeam from './AddTeam';

export default compose(
  firebaseConnect(),
  connect(({ firebase }) => ({
    profile: firebase.profile,
    owner: firebase.auth.uid,
  })),
)(AddTeam);
