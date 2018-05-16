import React from 'react'
import {Container, Header, Form, Button, Icon, Dropdown, Image} from 'semantic-ui-react'
import {isLoaded} from 'react-redux-firebase'
import {Link} from 'react-router-dom'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
import moment from 'moment'
import SMLoader from 'Components/SMLoader'
import SelectableTeams from 'Components/SelectableTeams'
import TaskList from './TaskList'


const propTypes = {
	firebase: PropTypes.object.isRequired,
	teams: PropTypes.object,
	owner: PropTypes.string.isRequired
}

export default class CreateEstimation extends React.Component {
	state = {
		selectedTeamId: null,
		selectedNames: [],
		selectedMembers: [],
		allMembers: [],
		tasks: []
	}

	componentWillReceiveProps(props) {
		this.setDefaultTeam(props)
	}

	componentDidMount() {
		this.setDefaultTeam(this.props)
	}

	onAddMember = (e, {value, options}) => {
		let selectedMembers = options.filter(member => value.indexOf(member.value) !== -1)
		this.setState({selectedNames: value, selectedMembers: selectedMembers})
	}

	onAddTask = title => {
		const {tasks} = this.state
		tasks.push({title: title})
		this.setState({tasks: tasks})
	}

	setDefaultTeam = props => {
		const {teams} = props
		const {selectedTeamId} = this.state
		if (!teams || selectedTeamId) return
		this.generateValues(teams, _.keys(teams)[0])
	}

	generateValues = (teams, teamId) => {
		let allMembers = [], 
		membersNames = [],
		members = teams[teamId].members

		_.keys(members).map((memberKey, index) => {
			const member = members[memberKey]
			const avatar = member.avatar ? require(`Images/${member.avatar}`) : null
			allMembers.push({
				value: member.name,
				key: memberKey,
				text: member.name,
				content: <div>
					<Image avatar src={avatar} />
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

	onCreateEstimation = () => {
		const {teams, firebase, history, owner} = this.props
		const {selectedMembers, selectedTeamId, tasks} = this.state
		if (!teams) {
			NotificationManager.error(`You can't create estimation meeting without team`, `Error`)
			return
		}
		let members = this.membersToObject(selectedMembers),
				tasksToSave = this.tasksToObject(tasks)

		this.create(selectedTeamId, owner, members, tasksToSave, teams)
	}

	create = (teamId, owner, members, tasks, teams) => {
		const {firebase, history} = this.props
		firebase.push('estimationMeetings/', {
			team: teamId,
			owner: owner,
			members: members,
			tasks: tasks,
			timestamp: moment().unix()
		}).then(team => {
			NotificationManager.success(
				`Estimation meeting for ${teams[teamId].name} successfully created`, 
				'Confirmation'
			)
			history.push('/estimation')
		})
	}

	// members array to object
	membersToObject = membersArray => {
		let membersObj = {}
		membersArray.map((member, index) => {
			membersObj[member.key] = {
				name: member.text
			}
		})
		return membersObj
	}

	// tasks array to object
	tasksToObject = tasksArray => {
		let tasksObj = {}
		tasksArray.map((task, index) => {
			tasksObj[index] = {
				title: task.title
			}
		})
		return tasksObj
	}

	removeTask = index => {
		const {tasks} = this.state
		tasks.splice(index, 1)
		this.setState({tasks: tasks})
	}


	render() {
		const {selectedTeamId, allMembers, selectedNames, tasks} = this.state
		const {teams} = this.props
		return (
			<Container>
				{
					!isLoaded(teams) ?
					<SMLoader /> :
					teams ?
					<div>
						<h2 className="form-title">Create Estimation Meeting</h2>
						<Form className="add">
							<SelectableTeams teams={teams} selectTeam={this.selectTeam} selectedTeamId={selectedTeamId} />
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
										placeholder={"Team members"} 
										multiple 
										onChange={this.onAddMember}
										selection 
										value={selectedNames || []}
										options={allMembers || []} />
								}

							</Form.Field>
							<Form.Field className="form-field team-members">
								<label className="label">Tasks to estimate</label>
								<TaskList tasks={tasks} addTask={this.onAddTask} removeTask={this.removeTask} />

							</Form.Field>
							<Button 
								onClick={this.onCreateEstimation} 
								floated="right"
								disabled={!teams}
								size="medium" 
								type="submit" 
								secondary
							>
								Create Estimation
							</Button>
						</Form>
					</div>
					:
					<div className="text-center">
						<h1>To create estimation meeting you need to have one team at least.</h1>
						<Button as={Link} to="/teams/add" className="mt-4" secondary size="medium">Create Team</Button>
					</div>
				}
			</Container>
		)
	}
}

CreateEstimation.propTypes = propTypes 