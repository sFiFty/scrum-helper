import React from 'react'
import { CirclePicker } from 'react-color'
import {Container, Header, Input, Form, Button, Message} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import './styles.scss'

export default class CreateDaily extends React.Component {
	state = {
    name: null,
    selectedTeamId: null,
		errorMessage: null,
	}

  setName = event => this.setState({name: event.target.value})
  
	onCreateDaily = () => {
		const {name, color} = this.state
		const {firebase, history, owner} = this.props
		if (!name || name.length < 1) {
			this.setState({errorMessage: 'Please provide team name'})
			return
		} 
		this.setState({errorMessage: null})
		firebase.push('teams/', {
			name: name,
			color: color,
			owner: owner
		}).then(team => {
			NotificationManager.success(
				`Team ${name} successfully created`, 
				'Confirmation'
			)
			history.push('/teams')
		})
	}
	render() {
		const {errorMessage, selectedTeamId} = this.state
		const {teams} = this.props
		return (
			<Container>
				<Header as='h2'>Create Daily Meeting</Header>
				<Form className="add">
					{
						errorMessage ?
						<Message color='red'>{errorMessage}</Message>
						: ''
					}
					<Form.Field className="name">
						<Input onChange={this.setName.bind(this)} size='massive' placeholder='Type team name here...' />
					</Form.Field>
					<Form.Field className="teams-to-choose d-flex flex-row">
						{
							_.keys(teams).map((teamKey, index) => {
								return <div 
									style={{backgroundColor: teams[teamKey].color}} 
									className="team-box font-s p-2 text-white" 
									
									key={index}> 
									{teams[teamKey].name} 
								</div>
							})
						}
					</Form.Field>
					<Button onClick={this.onCreateDaily} floated="right" size="big" type="submit" secondary>Create Daily</Button>
				</Form>
			</Container>
		)
	}
}