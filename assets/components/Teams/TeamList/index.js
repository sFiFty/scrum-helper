import React from 'react'
import {Container, Header, List, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {NotificationManager}  from 'react-notifications'
import EmptyTeamList from './EmptyTeamList'
import MemberListInTeam from 'Components/Teams/TeamList/MemberListInTeam'
import AddTeamBox from './AddTeamBox'
import SMLoader from '../../SMLoader'
import './team-list.scss'

export default class TeamList extends React.Component {

  deleteTeam = key => {
    const {firebase, teams} = this.props
    firebase.remove(`teams/${key}/`).then(() => {
      NotificationManager.success(
        `Team ${teams[key].name} successfully deleted`, 
        'Confirmation'
      )
    })
  }

	deleteMember = (member, teamid) => {
		const {firebase, teams} = this.props
    const team = teams[teamid]
		firebase.remove(`teams/${teamid}/members/${member.id}`).then(() => {
			NotificationManager.success(
				`Member ${member.name} successfully removed from ${teams[teamid].name}`, 
				'Confirmation'
			)
		})
	}

  render() {
    const {teams} = this.props
    return (
      <Container className="team-list-container">
        <Header as='h2'>My Teams</Header>
        {
          isLoaded(teams) ?
          <List className="team-list">
            {
              _.keys(teams).map(k => {
                return (
                  <List.Item className="team-item text-color" key={k}>
                    <div className="color-filler" style={{backgroundColor: teams[k].color}}></div>
                    <List.Content>
                      <List.Header>{teams[k].name}</List.Header>
                      <MemberListInTeam members={teams[k].members} teamid={k} deleteMember={this.deleteMember} />
                      <div className="team-controls">
                        <Link to={`/teams/${k}/addMember`} className="icon-border">
                          <Icon size="large" name="add" />
                        </Link>
                        <Icon className="trash-icon" onClick={() => this.deleteTeam(k)} size="large" name="trash" color="red" />
                      </div>
                    </List.Content>
                  </List.Item>
                )
              })
            }
            <AddTeamBox />
          </List> :
          <SMLoader />
        }
      </Container>
    )
  }
}