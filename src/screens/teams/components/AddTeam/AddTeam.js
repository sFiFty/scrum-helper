import React from 'react'
import {CirclePicker} from 'react-color'
import {Container, Header, Input, Form, Button, Message, Popup} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
import DefaultAvatars from 'Components/DefaultAvatars'

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

	setAvatar = event => {

	}

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
				<h2 className="form-title">Add New Team</h2>
				<Form className="add">
					{
						errorMessage ?
						<Message color='red'>{errorMessage}</Message>
						: ''
					}
					<Form.Field className="name">
						<Input onChange={this.setName.bind(this)} size='massive' placeholder='Type team name here...' />
					</Form.Field>
					<Form.Field className="form-field">
						<label className="label font-m">Pick your team color</label>
						<CirclePicker color={color} onChange={this.onPickColor} width="100%" circleSize={38} />
					</Form.Field>
					<Form.Field className="form-field">
						<label className="label">Add team members</label>
						<Input className="w-50" size='mini' placeholder='Type team member name here...' />
						<Popup 
							trigger={
								<Button className="ml-3" onClick={this.onPickAvatar} size="mini" basic>Choose avatar</Button>
							} 
							on='click'>
								<DefaultAvatars onChoose={this.setAvatar} />
						</Popup>
					</Form.Field>
					<Button onClick={this.onAddTeam} floated="right" size="medium" type="submit" secondary>Add Team</Button>
				</Form>
			</Container>
		)
  }

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		owner: PropTypes.string.isRequired
	}
}