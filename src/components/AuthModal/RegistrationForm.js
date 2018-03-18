import React from 'react'
import {Divider, Form, Label, Input, Button, Icon, Message} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {withRouter} from "react-router-dom"
import {validateEmail} from "Helpers/Validators"

class RegistrationForm extends React.Component {
	state = {
		email: null,
		errorMessage: null,
		password: null,
	}

	setEmail = event => this.setState({email: event.target.value})
	setPassword = event => this.setState({password: event.target.value})

	validateForm = () => {
		const {email, password} = this.state
		const {history} = this.state
		if (!_.trim(email).length && !_.trim(email).length) {
			this.setState({errorMessage: 'Please provide email & password'})
			return false
		}
		if (!_.trim(email).length || !validateEmail(_.trim(email))) {
			this.setState({errorMessage: 'Please provide valid email'})
			return false
		}
		if (_.trim(password).length < 6) {
			this.setState({errorMessage: 'Password must contain at least 6 characters'})
			return false
		}
		this.setState({errorMessage: null})
		return true
	}


	signIn = () => {
		const {email, password, firstName, lastName} = this.state
		const {firebase, redirectTo, history} = this.props
		if (this.validateForm()) {
			firebase.createUser({email: email, password: password}).then(data => {
				firebase.auth().onAuthStateChanged(user => {
					user.sendEmailVerification()
					history.push('/email-confirmation')
				})
			}).catch(error => {
				this.setState({errorMessage: error.message})
			})
		}
	}

	render() {
		const {errorMessage} = this.state
		const {loginWithGoogle, loginWithFB, dialogClose} = this.props
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
						<Button type="submit" onClick={this.signIn} secondary>Sign In</Button>
						<Button onClick={dialogClose} as={Link} to="/">Cancel</Button>
					</div>
					<Divider />
					<Form.Field inline>
						<Button onClick={loginWithGoogle} color='google plus'>
							<Icon name='google plus' /> Join with Google
						</Button>
					</Form.Field>
					<Form.Field inline>
						<Button onClick={loginWithFB} color='facebook'>
							<Icon name='facebook' /> Join with Facebook
						</Button>
					</Form.Field>
				</Form>
			</div>
		)
	}

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		loginWithGoogle: PropTypes.func.isRequired,
		loginWithFB: PropTypes.func.isRequired
	}
}

export default withRouter(RegistrationForm)