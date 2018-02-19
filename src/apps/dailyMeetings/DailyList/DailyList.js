import React, {Component} from 'react'
import {Container, Header, List, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {NotificationManager}  from 'react-notifications'
import CreateMeetingBox from './CreateMeetingBox'
import SMLoader from 'Components/SMLoader'

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

  render() {
    const {meetings, uid} = this.props
    return (
      <Container className="team-list-container">
        <Header as='h2'>My Daily Meetings</Header>
        {
          isLoaded(meetings) ?
          <List className="team-list">
            {
              _.keys(meetings).map(k => {
                return (
                  <List.Item className="team-item text-color" key={k}>
                    <List.Content>
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