import React from 'react'
import PropTypes from 'prop-types'
import {Container, Icon, Image, Button, List, Input, Modal} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import {isLoaded} from 'react-redux-firebase'
import Dropzone from 'react-dropzone'
import SMLoader from 'Components/SMLoader'
import InlineEditable from 'Components/InlineEditable'
import './styles.scss'

export default class UserProfile extends React.Component {

	state = {
		name: null,
		email: null,
		nameIsEditing: false,
		emailIsEditing: false,
		isModalOpened: false,
	}

	onFileAdded = (files, rejected) => {
		const {firebase} = this.props
		return firebase.uploadFiles('test', files, 'test').then(data => {
			firebase.updateProfile({avatar: data[0].File.downloadURL})
		})
	}

  modalShow = () => this.setState({ isModalOpened: true })
	modalClose = () => this.setState({ isModalOpened: false })
	deleteProfile = () => {
		const { firebase } = this.props;
		var user = firebase.auth().currentUser;
		user.delete().then(function() {
			NotificationManager.success(
				`Your account was successfully deleted`, 
				'Confirmation'
			)
		}).catch(function(error) {
			NotificationManager.error(
				`Something went wrong, please contact us`, 
				'Error'
			)
		});
	}

	setName = name => {
		const {firebase} = this.props
		firebase.updateProfile({name: name})
	}
	
	render() {
		const {profile} = this.props
		const {nameIsEditing, emailIsEditing, isModalOpened} = this.state
		let dropzoneRef
		return (
			!isLoaded(profile)
			? <SMLoader />
			:   
			<Container>
				<div className="d-flex flex-row profile-container justify-content-center align-items-center">
					<div className="image-container d-flex flex-column align-items-center justify-content-center">
						<Dropzone 
							style={{ borderWidth: 0 }}
							ref={node => dropzoneRef = node} 
							onDrop={this.onFileAdded}>
							<Image src={profile.avatar} />
						</Dropzone>
						<Button onClick={() => { dropzoneRef.open() }} className="mt-3 w-100" basic size="tiny">Change Avatar</Button>
						<Button onClick={this.modalShow} className="mt-3 w-100" color="red" size="tiny">Delete Profile</Button>
					</div>
					<div className="profile-information-container">
						<List divided verticalAlign='middle'>
							<List.Item>
								<InlineEditable onChange={this.setName} text={profile.name} placeholder={'Type your name here...'} />
							</List.Item>
						</List>
					</div>
				</div>
        <Modal size="tiny" open={isModalOpened} onClose={this.modalClose}>
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.modalClose}>No</Button>
            <Button positive onClick={this.deleteProfile} icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
			</Container>
		)
	}
	
	static propTypes = {
		profile: PropTypes.object,
		firebase: PropTypes.object
	}

}