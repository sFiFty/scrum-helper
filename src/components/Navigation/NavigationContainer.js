import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Navigation from './Navigation.jsx';

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(Navigation);
