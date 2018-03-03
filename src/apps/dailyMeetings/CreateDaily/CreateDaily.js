import React from 'react'
import {Container, Header, Form, Button, Icon, Dropdown, Image} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
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

	componentWillReceiveProps(props) {
		const {teams} = props
		const {selectedTeamId} = this.state
		if (!teams || selectedTeamId) return
		this.generateValues(teams, _.keys(teams)[0])
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
		let members = {}
		this.shuffle(selectedMembers).map((member, index) => {
			members[index] = {
				id: member.key
			}
		})
		selectedMembers.map
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
				<Header as='h2'>Create Daily Meeting</Header>
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
						<Dropdown 
							placeholder={`Team members`} 
							multiple 
							onChange={this.onAddMember}
							selection 
							value={selectedNames || []}
							options={allMembers || []} />
					</Form.Field>
					<Button 
						onClick={this.onCreateDaily} 
						floated="right" 
						size="big" 
						type="submit" 
						secondary>
						Create Daily
					</Button>
				</Form>
			</Container>
		)
	}

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		teams: PropTypes.object,
		owner: PropTypes.string.isRequired
	}
}