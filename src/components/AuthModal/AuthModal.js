import React, { Component } from 'react';
import { Tab, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm.jsx';
import './styles.scss';

export default class AuthModal extends Component {
  state = {
    errorMessage: null,
    activeIndex: 0,
  }

  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  loginWithFB = () => {
    const { firebase, redirectTo } = this.props;
    firebase.login({ provider: 'facebook', type: 'popup' }).then(() => {
      if (redirectTo) redirectTo(location.search);
    });
  }

  loginWithGoogle = () => {
    const { firebase, redirectTo } = this.props;
    firebase.login({ provider: 'google', type: 'popup' }).then(() => {
      if (redirectTo) redirectTo(location.search);
    });
  }

  login = (email, password) => {
    const { firebase, redirectTo } = this.props;
    firebase.login({ email, password }).then(() => {
      if (redirectTo) redirectTo(location.search);
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex) this.setState({ activeIndex: nextProps.activeIndex });
  }

  componentWillMount() {
    const { auth, redirectTo } = this.props;
    if (auth.isLoaded && !auth.isEmpty && redirectTo) {
      if (redirectTo) redirectTo(location.search);
    }
  }

  render() {
    const { dialogClose, firebase, isDialogOpened } = this.props;
    const { errorMessage, activeIndex } = this.state;
    const panes = [
      {
        menuItem: 'Log In',
        render: () => (
          <Tab.Pane className="auth-tab" attached={false}>
            <LoginForm
              login={this.login}
              loginWithFB={this.loginWithFB}
              errorMessage={errorMessage}
              loginWithGoogle={this.loginWithGoogle}
              dialogClose={dialogClose}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Sign In',
        render: () => (
          <Tab.Pane className="auth-tab" attached={false}>
            <RegistrationForm
              firebase={firebase}
              loginWithFB={this.loginWithFB}
              loginWithGoogle={this.loginWithGoogle}
              dialogClose={dialogClose}
            />
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

  static propTypes = {
    firebase: PropTypes.object.isRequired,
    isDialogOpened: PropTypes.bool,
    dialogOpen: PropTypes.func,
    redirectTo: PropTypes.func,
    activeIndex: PropTypes.number,
  }
}
