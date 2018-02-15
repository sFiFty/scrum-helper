import React from 'react'
import Moment from 'react-moment'

export default class EmailConfirmation extends React.Component {
	render() {
		const {firebase, history, profile} = this.props
		firebase.auth().onAuthStateChanged(user => {
			console.log(user)
			console.log(profile)
			if (!user) {
				history.push('/')
				return
			}
			user.sendEmailVerification()
		})
		return (
			<div> 
				<h1>Verify Your Email Address</h1>
				<div>
					We've sent an email to {profile.email} to verify your address. Please click the link in that email to continue.
				</div>
			</div>
		)
	}
}