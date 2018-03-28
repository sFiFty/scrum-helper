import React from 'react'
import PropTypes from 'prop-types'
import {Container, Icon, Image, Button} from 'semantic-ui-react'
import {isLoaded} from 'react-redux-firebase'
import Dropzone from 'react-dropzone'
import SMLoader from 'Components/SMLoader'
import './styles.scss'

export default class UserProfile extends React.Component {

	onFileAdded = (files, rejected) => {
		const {firebase} = this.props
		return firebase.uploadFiles('test', files, 'test').then(data => {
			firebase.updateProfile({avatar: data[0].File.downloadURL})
		})
	}

	render() {
		const {profile} = this.props
		console.log(profile);
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
					</div>
					<div className="profile-information-container">
						<h1>{profile.name}</h1>
						<div className="profile-email">
							<Icon name="mail" /> {profile.email}
						</div>
					</div>
				</div>
			</Container>
		)
	}
	
	static propTypes = {
		profile: PropTypes.object,
		firebase: PropTypes.object
	}

}