import React from 'react'
import {Container, Header, Form, Button, Icon, Dropdown, Image} from 'semantic-ui-react'
import SMLoader from 'Components/SMLoader'

export default class CreateDaily extends React.Component {

	render() {
		const {selectedTeamId, allMembers, selectedNames} = this.state
		const {teams} = this.props
		return (
			<Container>
					<div>
						<h2 className="form-title">Create Estimation Meeting</h2>
							<Button 
								floated="right"
								size="medium" 
								type="submit" 
								secondary>
								Create Daily
							</Button>
					</div>
			</Container>
		)
	}

	static propTypes = {
		firebase: PropTypes.object.isRequired
	}
}