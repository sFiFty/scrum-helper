import React from 'react'
import { CirclePicker } from 'react-color'
import {Container, Header, Input, Form, Button, Message} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import './add-team.scss'

export default class TeamList extends React.Component {
	state = {
		name: null,
		color: {
			hex: '#fff'
		},
		errorMessage: null,
	}

	onPickColor = (color, event) => this.setState({color: color.hex})
	setName = event => this.setState({name: event.target.value})
	onAddTeam = () => {
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
		const {errorMessage, color} = this.state
		return (
			<Container>
				<Header as='h2'>Add New Team</Header>
				<Form className="add-team-form">
					{
						errorMessage ?
						<Message color='red'>{errorMessage}</Message>
						: ''
					}
					<Form.Field className="team-name">
						<Input onChange={this.setName.bind(this)} size='massive' placeholder='Type team name here...' />
					</Form.Field>
					<Form.Field className="color-picker">
						<label className="color-picker-label">Pick your team color</label>
						<CirclePicker color={color} onChange={this.onPickColor} width="100%" circleSize={38} />
					</Form.Field>
					<Button onClick={this.onAddTeam} floated="right" size="big" type="submit" secondary>Add Team</Button>
				</Form>
			</Container>
		)
	}
}