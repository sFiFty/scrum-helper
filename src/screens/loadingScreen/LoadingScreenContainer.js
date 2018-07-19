import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import LoadingScreen from './LoadingScreen';

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(LoadingScreen);
