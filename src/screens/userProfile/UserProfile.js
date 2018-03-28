import React from 'react'
import PropTypes from 'prop-types'
import SMLoader from 'Components/SMLoader'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {Card, Icon, Image} from 'semantic-ui-react'

export default class UserProfile extends React.Component {
	render() {
		const { profile } = this.props
		return (
			!isLoaded(profile)
			? <SMLoader />
			:   
			<Card>
				<Image size="medium" src={profile.avatar} />
				<Card.Content>
					<Card.Header>
						{profile.displayName}
					</Card.Header>
					<Card.Meta>
						Verification type: {profile.verificationType}
					</Card.Meta>
				</Card.Content>
				<Card.Content extra>
					Email: {profile.email}
				</Card.Content>
			</Card>
		)
	}
	
	static propTypes = {
		profile: PropTypes.object,
		firebase: PropTypes.object
	}

}