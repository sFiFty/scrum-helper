import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import UserAvatar from 'Components/UserAvatar';
import AuthModal from 'Components/AuthModal';
import SMLoader from 'Components/SMLoader';

const propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func,
  }).isRequired,
  auth: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

class Auth extends Component {
  state = {
    isDialogOpened: false,
  }

  dialogClose = () => this.setState({ isDialogOpened: false })

  render() {
    const { auth, firebase, profile } = this.props;
    const { isDialogOpened } = this.state;
    return (
      <div>
        <AuthModal
          {...this.props}
          dialogClose={this.dialogClose}
          isDialogOpened={isDialogOpened}
        />
        {
          !isLoaded(auth) ? (
            <SMLoader size="xs" />
          ) : isEmpty(auth) ? (
            <Button size="mini" type="submit" onClick={this.dialogOpen} secondary>Sign In</Button>
          ) : (
            <UserAvatar signOut={() => { firebase.auth().signOut(); }} uid={auth.uid} name={profile.name} avatar={profile.avatar} />
          )
        }
      </div>
    );
  }
}

Auth.propTypes = propTypes;

export default Auth;
