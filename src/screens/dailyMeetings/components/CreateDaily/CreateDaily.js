import React from 'react'
import {Container, Header, Form, Button, Icon, Dropdown, Image} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import moment from 'moment'
import './styles.scss'

export default class CreateDaily extends React.Component {
	state = {
		selectedTeamId: null,
		selectedNames: [],
		selectedMembers: [],
		allMembers: []
	}

	onAddMember = (e, {value, options}) => {
		let selectedMembers = options.filter(member => value.indexOf(member.value) !== -1)
		this.setState({selectedNames: value, selectedMembers: selectedMembers})
	}

	setDefaultTeam = props => {
		const {teams} = props
		const {selectedTeamId} = this.state
		if (!teams || selectedTeamId) return
		this.generateValues(teams, _.keys(teams)[0])
	}

	componentWillReceiveProps(props) {
		this.setDefaultTeam(props)
	}

	componentWillMount() {
		this.setDefaultTeam(this.props)
	}

	generateValues = (teams, teamId) => {
		let allMembers = [] 
		let membersNames = []
		const members = teams[teamId].members
		_.keys(members).map((memberKey, index) => {
			const member = members[memberKey]
			allMembers.push({
				value: member.name,
				key: memberKey,
				text: member.name,
				content: <div>
					<Image avatar src={require(`Images/${member.avatar}`)} />
					<span>{member.name}</span>
				</div>
			})
			membersNames.push(member.name)
		})

		this.setState({
			allMembers: allMembers,
			selectedMembers: allMembers,
			selectedNames: membersNames,
			selectedTeamId: teamId
		})
	}
	
	selectTeam = key => {
		const {teams} = this.props
		this.generateValues(teams, key)
	}

	shuffle = array => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	onCreateDaily = () => {
		const {teams, firebase, history, owner} = this.props
		const {selectedMembers, selectedTeamId} = this.state
		if (!teams) {
			NotificationManager.error(`You can't create daily without team`, `Error`);
			return;
		}
		
		let members = {}
		this.shuffle(selectedMembers).map((member, index) => {
			members[index] = {
				id: member.key
			}
		})

		firebase.push('dailyMeetings/', {
			team: selectedTeamId,
			owner: owner,
			members: members,
			timestamp: moment().unix(),
			step: 0
		}).then(team => {
			NotificationManager.success(
				`Daily for ${teams[selectedTeamId].name} successfully created`, 
				'Confirmation'
			)
			history.push('/daily')
		})
	}
	render() {
		const {selectedTeamId, allMembers, selectedNames} = this.state
		const {teams} = this.props
		return (
			<Container>
				{
					teams ?
					<div>
						<h2 className="form-title">Create Daily Meeting</h2>
						<Form className="add">
							<Form.Field className="teams-to-choose d-flex flex-row">
								{
									_.keys(teams).map((teamKey, index) => {
										const selectedClass = selectedTeamId === teamKey ? 'selected' : null
										const classes = `${selectedClass} team-box font-s p-3 text-white`
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
							<Form.Field className="mt-5">
								{
									allMembers.length === 0 ?
									<div className="font-m">
										Your team is empty. Do you want to add member? 
										<Link className="ml-3 text-link" to={`/teams/${selectedTeamId}/addMember`}>
											Add member<Icon name="arrow right" />
										</Link>
									</div>
									:
									<Dropdown 
									placeholder={`Team members`} 
									multiple 
									onChange={this.onAddMember}
									selection 
									value={selectedNames || []}
									options={allMembers || []} />
								}

							</Form.Field>
							<Button 
								onClick={this.onCreateDaily} 
								floated="right"
								disabled={!teams}
								size="medium" 
								type="submit" 
								secondary>
								Create Daily
							</Button>
						</Form>
					</div>
					:
					<div className="text-center">
						<h1>To create daily you need to have one team at least.</h1>
						<Button as={Link} to="/teams/add" className="mt-4" secondary size="medium">Create Team</Button>
					</div>
				}
			</Container>
		)
	}

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		teams: PropTypes.object,
		owner: PropTypes.string.isRequired
	}
}