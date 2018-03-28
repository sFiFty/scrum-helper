import React from 'react'
import PropTypes from 'prop-types'
import {Container, Icon, Image} from 'semantic-ui-react'
import {isLoaded} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import './styles.scss'

export default class UserProfile extends React.Component {
	render() {
		const {profile} = this.props
		return (
			!isLoaded(profile)
			? <SMLoader />
			:   
			<Container>
				<div className="d-flex flex-row profile-container justify-content-center align-items-center">
					<div className="image-container">
						<Image size="medium" src={profile.avatar} />
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