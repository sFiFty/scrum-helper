import React from 'react';
import {
  Divider, Form, Button, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';

import { validateEmail } from 'Helpers/Validators';

const propTypes = {
  firebase: PropTypes.shape({
    createUser: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dialogClose: PropTypes.func.isRequired,
};

class RegistrationForm extends React.Component {
  state = {
    email: null,
    errorMessage: null,
    password: null,
  }

  setEmail = event => this.setState({ email: event.target.value })

  setPassword = event => this.setState({ password: event.target.value })

  validateForm = () => {
    const { email, password } = this.state;
    if (!_.trim(email).length && !_.trim(email).length) {
      this.setState({ errorMessage: 'Please provide email & password' });
      return false;
    }
    if (!_.trim(email).length || !validateEmail(_.trim(email))) {
      this.setState({ errorMessage: 'Please provide valid email' });
      return false;
    }
    if (_.trim(password).length < 6) {
      this.setState({ errorMessage: 'Password must contain at least 6 characters' });
      return false;
    }
    this.setState({ errorMessage: null });
    return true;
  }


  signIn = () => {
    const { email, password } = this.state;
    const { firebase, history } = this.props;
    if (this.validateForm()) {
      firebase.createUser({ email, password }).then(() => {
        firebase.auth().onAuthStateChanged(() => {
          history.push('/');
        });
      }).catch((error) => {
        this.setState({ errorMessage: error.message });
      });
    }
  }

  render() {
    const { errorMessage } = this.state;
    const { dialogClose } = this.props;
    return (
      <div className="auth-container text-center pt-1">
        <Form className="auth-form">
          { errorMessage && <Message color="red">{errorMessage}</Message> }
          <Form.Field inline>
            <label className="text-left">Email</label>
            <input onChange={this.setEmail} type="text" />
          </Form.Field>
          <Form.Field inline>
            <label className="text-left">Password (6 or more characters)</label>
            <input onChange={this.setPassword} type="password" />
          </Form.Field>
          <div className="mail-buttons d-flex justify-content-between">
            <Button type="submit" onClick={this.signIn} secondary>Sign In</Button>
            <Button as={Link} to="/" onClick={dialogClose}>Cancel</Button>
          </div>
          <Divider />
          <div>We will not verify your email.</div>
        </Form>
      </div>
    );
  }
}

RegistrationForm.propTypes = propTypes;

export default withRouter(RegistrationForm);
