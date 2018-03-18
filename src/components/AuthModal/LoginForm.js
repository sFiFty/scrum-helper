import React from 'react'
import {Divider, Form, Input, Button, Icon, Message} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {withRouter} from "react-router-dom"
const queryString = require('query-string')

class LoginForm extends React.Component {
	state = {
		email: null,
		password: null,
		errorMessage: null
	}

	setEmail = event => this.setState({email: event.target.value})
	setPassword = event => this.setState({password: event.target.value})
	   
	render() {
		const {email, password} = this.state
		const {loginWithGoogle, loginWithFB, login, errorMessage, dialogClose} = this.props
		return (
			<div className="auth-container text-center pt-1">
				<Form className="auth-form">
					{
						errorMessage ?
						<Message color='red'>{errorMessage}</Message>
						: ''
					}
					<Form.Field inline>
						<label className="text-left">Email</label>
						<input onChange={this.setEmail} type='text'/>
					</Form.Field>
					<Form.Field inline>
						<label className="text-left">Password (6 or more characters)</label>
						<input onChange={this.setPassword} type='password'/>
					</Form.Field>
          <div className="mail-buttons d-flex justify-content-between">
            <Button type="submit" onClick={() => login(email, password) } secondary>Log In</Button>
            <Button onClick={dialogClose} as={Link} to="/">Cancel</Button>
          </div>
					<Divider />
					<Form.Field inline>
						<Button onClick={loginWithGoogle} color='google plus'>
							<Icon name='google plus' /> Log in with Google
						</Button>
					</Form.Field>
					<Form.Field inline>
						<Button onClick={loginWithFB} color='facebook'>
							<Icon name='facebook' /> Log in with Facebook
						</Button>
					</Form.Field>
				</Form>
			</div>
		)
	}

	static propTypes = {
		loginWithGoogle: PropTypes.func.isRequired,
		loginWithFB: PropTypes.func.isRequired
	}
}

export default withRouter(LoginForm)