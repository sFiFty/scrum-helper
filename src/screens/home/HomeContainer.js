import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import Home from './Home.jsx';

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(Home);
