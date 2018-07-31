import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import { isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import Header from 'Components/Header';
import Footer from 'Components/Footer';
import SMLoader from 'Components/SMLoader';
import Routes from './Routes.jsx';
import store from '../../store';
import actionCreators from '../../actions';

const propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  firebase: PropTypes.shape({
    auth: PropTypes.func,
  }).isRequired,
};
export default class CoreLayout extends Component {
  componentDidMount() {
    const { firebase } = this.props;
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(actionCreators.AUTH_USER(user));
      } else {
        store.dispatch(actionCreators.SIGN_OUT_USER());
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { profile, location } = this.props;
    return (
      !isLoaded(profile)
        ? <SMLoader />
        : (
          <div className="sh-container">
            <Header location={location} />
            <div className="main">
              <Routes />
              <NotificationContainer />
            </div>
            <Footer />
          </div>
        )
    );
  }
}

CoreLayout.propTypes = propTypes;
