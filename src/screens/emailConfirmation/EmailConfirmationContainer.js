import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import EmailConfirmation from './EmailConfirmation';

let user = null;

export default compose(
  firebaseConnect((props, store) => {
    user = store.getState().auth.user;
  }),
  connect(
    state => (
      {
        profile: state.firebase.profile,
        user,
      }
    ),
  ),
)(EmailConfirmation);
