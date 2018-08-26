import React from 'react';
import {
  Divider, Form, Button, Icon, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const propTypes = {
  loginWithGoogle: PropTypes.func.isRequired,
  loginWithFB: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

class LoginForm extends React.Component {
	state = {
	  email: null,
	  password: null,
	  errorMessage: null,
	}

	setEmail = event => this.setState({ email: event.target.value })

	setPassword = event => this.setState({ password: event.target.value })

	render() {
	  const { email, password } = this.state;
	  const {
	    loginWithGoogle, loginWithFB, login, errorMessage, dialogClose,
	  } = this.props;
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
            <label className="text-left">cPassword (6 or more characters)</label>
            <input onChange={this.setPassword} type="password" />
          </Form.Field>
          <div className="mail-buttons d-flex justify-content-between">
            <Button type="submit" onClick={() => login(email, password)} secondary>Log In</Button>
            <Button onClick={dialogClose} as={Link} to="/">Cancel</Button>
          </div>
          <Divider />
          <Form.Field inline>
            <Button className="d-flex justify-content-center align-items-center" onClick={loginWithGoogle} color="google plus">
              <Icon size="large" name="google plus" /> Log in with Google
            </Button>
          </Form.Field>
          <Form.Field inline>
            <Button className="d-flex justify-content-center align-items-center" onClick={loginWithFB} color="facebook">
              <Icon size="large" name="facebook" /> Log in with Facebook
            </Button>
          </Form.Field>
        </Form>
      </div>
	  );
	}
}

LoginForm.propTypes = propTypes;

export default withRouter(LoginForm);
