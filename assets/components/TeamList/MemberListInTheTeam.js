import React from 'react'
import {Image, Icon, Popup, Header, Grid} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'

export default class MemberListInTheTeam extends React.Component {
	deleteMember = id => {
		const {members, firebase, teamid, teams} = this.props
		const team = teams[teamid]
		firebase.remove(`teams/${teamid}/members/${id}`).then(() => {
			NotificationManager.success(
				`Member ${team.members[id].name} successfully removed from ${teams[teamid].name}`, 
				'Confirmation'
			)
		})
	}
	render() {
		const {members, teamid, teams} = this.props
		const team = teams[teamid]
		return (
			<div className="member-list">
				{  
					team.members ?
					<div>
						{
							_.keys(team.members).map(k => {
								return <Popup
									key={k}
									trigger={<Image src={require(`../../img/${team.members[k].avatar}`)} avatar />}
									flowing
									hoverable
								>
									<Grid className="member-popup-details" verticalAlign="middle" centered columns={3}>
										<Grid.Column textAlign='center'>
											<Image src={require(`../../img/${team.members[k].avatar}`)} />
										</Grid.Column>
										<Grid.Column textAlign='center'>
											<Header as='h4'>{team.members[k].name}</Header>
										</Grid.Column>
										<Grid.Column textAlign='center'>
											<Icon onClick={() => this.deleteMember(k)} size="large" name="remove" color="red" />
										</Grid.Column>
									</Grid>
								</Popup>
							})
						}
					</div>
					:
					''
				}
			</div>
		)
	}
}

