import React, { Component } from 'react';
import { Tab, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import './styles.scss';

const propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }).isRequired,
  isDialogOpened: PropTypes.bool.isRequired,
  dialogClose: PropTypes.func.isRequired,
  redirectTo: PropTypes.func,
  activeIndex: PropTypes.number,
  auth: PropTypes.shape({
    isLoaded: PropTypes.bool,
    isEmpty: PropTypes.bool,
  }).isRequired,
};

const defaultProps = {
  redirectTo: null,
  activeIndex: 0,
};

class AuthModal extends Component {
  state = {
    errorMessage: null,
    activeIndex: 0,
  }

  componentWillMount() {
    const { auth, redirectTo } = this.props;
    if (auth.isLoaded && !auth.isEmpty && redirectTo) {
      if (redirectTo) redirectTo(window.location.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex) this.setState({ activeIndex: nextProps.activeIndex });
  }

  login = (email, password) => {
    const { firebase, redirectTo } = this.props;
    firebase.login({ email, password }).then(() => {
      if (redirectTo) redirectTo(window.location.search);
    }).catch((error) => {
      if (error.code === 'auth/user-not-found') {
        this.setState({ errorMessage: "Sorry, we can't find an account with this email address" });
        return;
      }
      if (error.code === 'auth/wrong-password') {
        this.setState({ errorMessage: 'Incorrect password. Please try again.' });
        return;
      }
      this.setState({ errorMessage: error.message });
    });
  }

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render() {
    const { dialogClose, isDialogOpened } = this.props;
    const { errorMessage, activeIndex } = this.state;
    const panes = [
      {
        menuItem: 'Log In',
        render: () => (
          <Tab.Pane className="auth-tab" attached={false}>
            <LoginForm
              login={this.login}
              errorMessage={errorMessage}
              dialogClose={dialogClose}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Sign In',
        render: () => (
          <Tab.Pane className="auth-tab" attached={false}>
            <RegistrationForm {...this.props} dialogClose={dialogClose} />
          </Tab.Pane>
        ),
      },
    ];
    return (
      <Modal
        className="auth-dialog"
        size="mini"
        open={isDialogOpened}
        onClose={dialogClose}
      >
        <Tab
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          className="auth-tabs"
          menu={{ secondary: true, pointing: true }}
          panes={panes}
        />
      </Modal>
    );
  }
}

AuthModal.propTypes = propTypes;
AuthModal.defaultProps = defaultProps;

export default AuthModal;
