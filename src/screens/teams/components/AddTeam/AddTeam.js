import React from 'react'
import {CirclePicker} from 'react-color'
import {Container, Header, Input, Form, Button, Message, Popup, List, Image, Icon} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
import DefaultAvatars from 'Components/DefaultAvatars'
import AddMember from '../AddMember/AddMember';
import './styles.scss'
export default class TeamList extends React.Component {
	state = {
		name: null,
		color: {
			hex: '#fff'
		},
		errorMessage: null,
		members: [],
		memberName: null,
		memberAvatar: null,
		isPopupOpen: false
	}

	onPickColor = (color, event) => this.setState({color: color.hex})

	onPopupClose = () => this.setState({isPopupOpen: false})

	onPopupOpen = () => this.setState({isPopupOpen: true})

	setName = event => this.setState({name: event.target.value})

	setMemberAvatar = avatar => this.setState({memberAvatar: avatar, isPopupOpen: false})

	setMemberName = event => this.setState({memberName: event.target.value})

	removeMember = index => {
		const {members} = this.state
		members.splice(index, 1)
		this.setState({members: members})
	}

	addMember = () => {
		const {memberName, memberAvatar, members} = this.state
		members.push({
			name: memberName,
			avatar: memberAvatar
		})
		this.setState({
			memberAvatar: null,
			memberName: null,
			members: members
		})
	}

	onAddTeam = () => {
		const {name, color, members} = this.state
		const {firebase, history, owner} = this.props
		if (!name || name.length < 1) {
			this.setState({errorMessage: 'Please provide team name'})
			return
		} 
		this.setState({errorMessage: null})
		firebase.push('teams/', {
			name: name,
			color: color,
			owner: owner,
			members: members
		}).then(team => {
			let membersToSave = {}
			members.map(member => {
				membersToSave[firebase.push().key] = member
			})
			firebase.push(`teams/${team.key}/members`, membersToSave)
			NotificationManager.success(
				`Team ${name} successfully created`, 
				'Confirmation'
			)
			history.push('/teams')
		})
	}
	render() {
		const {errorMessage, color, members, memberAvatar, memberName, isPopupOpen} = this.state
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
						<label className="label">Team members</label>
						{
							members &&
							<List className="w-50 generated-members-list">
								{
									members.map((member, key) => {
										return (
											<List.Item key={key} className="member d-flex justify-content-start align-items-center">
												<Image avatar src={require(`Images/${member.avatar}`)} />
												<List.Content className="ml-2">
													{member.name}
												</List.Content>
												<List.Content className="ml-auto">
													<Icon 
														className="remove-member-icon"
														role="button"
														onClick={() => this.removeMember(key)} 
														size="large" 
														name="trash" 
														color="red" />
												</List.Content>
											</List.Item>
										)
									})
								}
							</List>
						}
						<Input 
							onChange={this.setMemberName.bind(this)} 
							value={memberName || ''}
							className="w-50" size='mini' 
							placeholder='Type member name here...' />
						<Popup 
							open={isPopupOpen}
							onOpen={this.onPopupOpen}
							onClose={this.onPopupClose}
							trigger={<Button className="ml-3" size="mini" basic>Choose avatar</Button>} 
							on='click'>
								<DefaultAvatars selectedAvatar={memberAvatar} onChoose={this.setMemberAvatar} />
						</Popup>
						{
							memberAvatar && memberName &&
							<Button onClick={this.addMember} className="ml-3" size="mini" secondary>Add</Button>
						}
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