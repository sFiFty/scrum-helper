import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import SwipeableViews from 'react-swipeable-views'
import {Tab} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import {firebase} from 'react-redux-firebase'

export default class AuthDialog extends Component {
	static propTypes = {
		firebase: PropTypes.object.isRequired,
		isDialogOpened: PropTypes.bool.isRequired,
		dialogClose: PropTypes.func.isRequired
	}

	loginWithFB = () => {
		const {firebase} = this.props
		firebase.login({provider: 'facebook', type: 'popup'})
	}

	loginWithGoogle = () => {
		const {firebase} = this.props
		firebase.login({provider: 'google', type: 'popup'})
	}

	render() {
		const panes = [
			{ menuItem: 'Log In', render: () => 
				<Tab.Pane className="auth-tab" attached={false}>
					<LoginForm firebase={firebase} loginWithFB={this.loginWithFB} loginWithGoogle={this.loginWithGoogle} />
				</Tab.Pane> 
			},
			{ menuItem: 'Sign In', render: () => 
				<Tab.Pane className="auth-tab" attached={false}>
					<RegistrationForm firebase={firebase} loginWithFB={this.loginWithFB} loginWithGoogle={this.loginWithGoogle} />
				</Tab.Pane> },
		  ]
		const {isDialogOpened, dialogClose, firebase} = this.props
		return (
			<Dialog
				className="auth-dialog"
				contentStyle={{maxWidth: 450}}
				modal={false}
				open={isDialogOpened}
				onRequestClose={dialogClose}
			>
				<Tab className="auth-tabs" menu={{secondary: true, pointing: true}} panes={panes} />
			</Dialog>
		)
	}
}