import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import AuthModal from './AuthModal.jsx';

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(AuthModal);
