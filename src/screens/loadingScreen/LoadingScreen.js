import React, { Component } from 'react';
import PropTypes from 'prop-types';


import AuthModal from 'Components/AuthModal';
import './styles.scss';
const queryString = require('query-string');

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default class LoadingScreen extends Component {
  state = {
    isDialogOpened: true,
  }

  redirectTo = (destination) => {
    const { history } = this.props;
    const url = queryString.parse(destination) && queryString.parse(destination).redirect;
    if (url) history.push(url);
  }

  render() {
    const { isDialogOpened } = this.state;
    return (
      <div className="loading-screen-container">
        <AuthModal
          className="dialog"
          dialogClose={this.dialogClose}
          isDialogOpened={isDialogOpened}
          redirectTo={this.redirectTo}
          {...this.props}
        />
        <div className="overlay" />
      </div>
    );
  }
}

LoadingScreen.propTypes = propTypes;
