import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import EmailModal from './EmailModal.jsx';

let currentUser = null;

export default compose(
  firebaseConnect((props, store) => {
    currentUser = store.getState().auth.user;
  }),
  connect(
    state => (
      {
        profile: state.firebase.profile,
        user: currentUser,
      }
    ),
  ),
)(EmailModal);
