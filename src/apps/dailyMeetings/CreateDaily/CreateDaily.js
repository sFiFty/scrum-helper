import React from 'react'
import { CirclePicker } from 'react-color'
import {Container, Header, Input, Form, Button, Message, Icon, Dropdown} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import './styles.scss'

export default class CreateDaily extends React.Component {
	state = {
    name: null,
		errorMessage: null,
		selectedTeamId: null
	}

  setName = event => this.setState({name: event.target.value})
	
	selectTeam = key => this.setState({selectedTeamId: key})

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
		const selectedKey = selectedTeamId || _.keys(teams)[0]
		let members = []
		if (teams) {
			_.keys(teams[selectedKey].members).map((member, index) => {
				members.push({
					value: member.name,
					key: index,
					text: member.name
				})
			})
			console.log(members)
		}

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
								const selectedClass = selectedKey === teamKey ? 'selected' : null
								const classes = `${selectedClass} team-box font-s p-2 text-white`;
								return <div 
									style={{backgroundColor: teams[teamKey].color}} 
									className={classes}
									onClick={() => this.selectTeam(teamKey)} 
									key={index}> 
									<Icon className="checkmark-icon" size="big" name="checkmark" color="black" />
									<div className="overlay-block"></div>
									<span>{teams[teamKey].name}</span> 
								</div>
							})
						}
					</Form.Field>
					<Form.Field>
						<Dropdown 
							placeholder={`Team members`} 
							multiple 
							selection 
							options={members} />
					</Form.Field>
					<Button onClick={this.onCreateDaily} floated="right" size="big" type="submit" secondary>Create Daily</Button>
				</Form>
			</Container>
		)
	}
}