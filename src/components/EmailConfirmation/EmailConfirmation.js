import React from 'react'
import {Container, Icon, Button, Modal, Header, Input} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import EmailModal from 'Components/EmailModal'
import PropTypes from 'prop-types'
import ClearFix from 'material-ui/internal/ClearFix';

export default class EmailConfirmation extends React.Component {
  state = { 
		isModalOpen: false,
		user: null
  }

	closeModal = () => this.setState({isModalOpen: false})
	openModal = () => this.setState({isModalOpen: true})
	
	sendEmailVerification = notifyUser => {
		const {firebase, user, profile} = this.props
		firebase.updateProfile({isVerificationEmailSent: true}).then(() => {
			user.sendEmailVerification().then(data => {
				if (!notifyUser) return
				NotificationManager.success(
					'Mail sent successfully!', 
					'Confirmation'
				)
			})
		})
	}

	componentDidMount() {
		const {profile, user, history} = this.props
		if (user.emailVerified) {
			history.push('/')
			return
		}
		if (profile.isVerificationEmailSent) return
		this.sendEmailVerification()
	}

	render() {
		const {profile, firebase} = this.props
		const {isModalOpen} = this.state
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
            <Button onClick={() => this.sendEmailVerification(true)} basic className="w-25">
              Resend email  
						</Button> 
						<Button onClick={this.openModal} basic className="ml-5 mr-5 w-25">
							Enter new email
						</Button>
            <Button basic className="w-25">
              Contact us  
            </Button>   
          </div>
				</div>
				<EmailModal isModalOpen={isModalOpen} close={this.closeModal} />
			</Container>
		)
  }

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		profile: PropTypes.object.isRequired,
		user: PropTypes.object
	}
}

