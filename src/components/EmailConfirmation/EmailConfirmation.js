import React from 'react'
import {Container, Icon, Button, Modal, Header, Input} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import EmailModal from './EmailModal'

export default class EmailConfirmation extends React.Component {

	sendEmailVerification = () => {
		const {firebase, history, profile} = this.props
		firebase.auth().onAuthStateChanged(user => {
			if (!user || user.emailVerified) {
				history.push('/')
				return
			}

			user.sendEmailVerification().then(data => {
				firebase.updateProfile({ isVerificationEmailsent: true })
				NotificationManager.success(
					'Mail sent successfully!', 
					'Confirmation'
				)
			})
		})
	}

	componentWillMount() {
		const {profile} = this.props
		if (profile.isVerificationEmailsent) return
		this.sendEmailVerification()
	}

	render() {
		const {profile} = this.props

		return (
			<Container className="mt-4"> 
				<h1 className="text-center">Verify Your Email</h1>
				<div className="text-center">
					<div className="font-m mt-2 mb-3">
						We've sent an email to {profile.email} to verify your address. Please click the link in that email to continue.
					</div>
					<Icon
						size="massive"
						name="mail outline"
						className="mb-4"
					/>
          <div className="d-flex justify-content-center">
            <Button onClick={this.sendEmailVerification} basic className="w-25">
              Resend email  
            </Button> 
            <Button basic className="w-25">
              Contact us  
            </Button>   
          </div>
				</div>
			</Container>
		)
  }

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired,
	}
}

