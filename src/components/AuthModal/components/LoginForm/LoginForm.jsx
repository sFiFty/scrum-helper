import React from 'react';
import {
  Divider, Form, Button, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const propTypes = {
  login: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  dialogClose: PropTypes.func.isRequired,
};

const defaultProps = {
  errorMessage: null,
};

class LoginForm extends React.Component {
  state = {
    email: null,
    password: null,
  }

  setEmail = event => this.setState({ email: event.target.value })

  setPassword = event => this.setState({ password: event.target.value })

  render() {
    const { email, password } = this.state;
    const { login, errorMessage, dialogClose } = this.props;
    return (
      <div className="auth-container text-center pt-1">
        <Form className="auth-form">
          {
            errorMessage
              ? <Message color="red">{errorMessage}</Message>
              : ''
          }
          <Form.Field inline>
            <label className="text-left">Email</label>
            <input onChange={this.setEmail} type="text" />
          </Form.Field>
          <Form.Field inline>
            <label className="text-left">Password (6 or more characters)</label>
            <input onChange={this.setPassword} type="password" />
          </Form.Field>
          <div className="mail-buttons d-flex justify-content-between">
            <Button type="submit" onClick={() => login(email, password)} secondary>Log In</Button>
            <Button onClick={dialogClose} as={Link} to="/">Cancel</Button>
          </div>
          <Divider />
        </Form>
      </div>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default withRouter(LoginForm);
