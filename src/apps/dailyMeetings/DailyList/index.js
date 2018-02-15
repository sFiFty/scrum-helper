import React from 'react'
import {Container, Header, List, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {NotificationManager}  from 'react-notifications'
import AddMeetingBox from 'Components/DailyMeetings/DailyList/AddMeetingBox'
import SMLoader from 'Components/SMLoader'

export default class DailyList extends React.Component {

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
    console.log(meetings)
    return (
      <Container className="team-list-container">
        <Header as='h2'>My Daily Meetings</Header>
        {
          isLoaded(meetings) ?
          <List className="team-list">
            {
              _.keys(meetings).map(k => {
                if (meetings[k].owner !== uid) return
                return (
                  <List.Item className="team-item text-color" key={k}>
                    <List.Content>
                    </List.Content>
                  </List.Item>
                )
              })
            }
            <AddMeetingBox />
          </List> :
          <SMLoader />
        }
      </Container>
    )
  }
}