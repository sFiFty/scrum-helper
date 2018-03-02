import React from 'react'
import Moment from 'react-moment'
import {Container} from 'semantic-ui-react'

export default class EmailConfirmation extends React.Component {
	render() {
		const {firebase, history, profile} = this.props
		console.log(this.props)
		firebase.auth().onAuthStateChanged(user => {
			console.log(user)
			if (!user || user.emailVerified) {
				history.push('/')
				return
			}
			user.sendEmailVerification()
		})
		return (
			<Container> 
				<h1>Verify Your Email Address</h1>
				<div>
					We've sent an email to {profile.email} to verify your address. Please click the link in that email to continue.
				</div>
			</Container>
		)
	}
}