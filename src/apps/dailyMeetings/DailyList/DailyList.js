import React, {Component} from 'react'
import {Container, Header, List, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {NotificationManager}  from 'react-notifications'
import CreateMeetingBox from './CreateMeetingBox'
import SMLoader from 'Components/SMLoader'
import Members from 'Apps/teams/TeamList/Members'

export default class DailyList extends Component {

  deleteTeam = key => {
    const {firebase, meetings} = this.props
    firebase.remove(`dailyMeetings/${key}/`).then(() => {
      NotificationManager.success(
        `Meeting ${teams[key].name} successfully deleted`, 
        'Confirmation'
      )
    })
  }

	deleteMember = (member, meetingId) => {
    const {firebase, teams} = this.props
		firebase.remove(`dailyMeetings/${meetingId}/members/${member.key}`).then(() => {
			NotificationManager.success(
				`Member ${member.name} successfully removed`, 
				'Confirmation'
			)
		})
	}

  extendMembersList = (members, allTeamMembers) => {
    if (!allTeamMembers) return {}
    let extendedList = {}
    _.keys(members).map(memberKey => {
      let key = members[memberKey] && members[memberKey].id
      if (!key) return 
      extendedList[key] = {
        ...allTeamMembers[key],
        key: memberKey
      }
    })
    return extendedList
  }

  render() {
    const {meetings, teams} = this.props
    return (
      <Container className="team-list-container">
        <Header as='h2'>My Daily Meetings</Header>
        {
          isLoaded(meetings) ?
          <List className="team-list">
            {
              
              _.keys(meetings).map(k => {
                let meeting = meetings[k]
                let extendedMembersList = this.extendMembersList(meeting.members, meeting.team.members)
                return (
                  <List.Item className="team-item text-color" key={k}>
                    <div className="color-filler" style={{backgroundColor: meeting.team.color}}></div>
                    <List.Content>
                      <List.Header>{meeting.team.name} daily</List.Header>
                      <Members members={extendedMembersList} deleteMember={this.deleteMember} teamid={k} />
                      <div className="team-controls">
                        <Icon className="trash-icon" size="large" name="trash" color="red" />
                      </div>
                    </List.Content>
                  </List.Item>
                )
              })
            }
            <CreateMeetingBox />
          </List> :
          <SMLoader />
        }
      </Container>
    )
  }
}