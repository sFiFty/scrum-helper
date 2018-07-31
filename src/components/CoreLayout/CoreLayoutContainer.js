import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import CoreLayout from './CoreLayout.jsx';

export default compose(
  firebaseConnect(),
  connect(state => ({
    profile: state.firebase.profile,
  })),
)(CoreLayout);
