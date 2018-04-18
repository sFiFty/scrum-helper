import React, {Component} from 'react'
import {Container, Header, List, Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
import SMLoader from 'Components/SMLoader'
import MembersInTheList from 'Components/MembersInTheList'
import AddListItemBox from 'Components/AddListItemBox'
import ExtendMembersList from 'Helpers/ExtendMembersList'

export default class EstimationList extends Component {

  deleteEstimation = key => {
    const {firebase, estimations} = this.props
    firebase.remove(`estimationMeetings/${key}/`).then(() => {
      NotificationManager.success(
        `Meeting for ${estimations[key].team.name} successfully deleted`, 
        'Confirmation'
      )
    })
  }

	deleteMember = (member, meetingId) => {
    const {firebase, teams} = this.props
		firebase.remove(`estimationMeetings/${meetingId}/members/${member.key}`).then(() => {
			NotificationManager.success(
				`Member ${member.name} successfully removed`, 
				'Confirmation'
			)
		})
	}

  render() {
    const {estimations, teams} = this.props
    return (
      <Container className="list-container daily-list">
        <h2 className="list-title">My Estimation Meetings</h2>
        {
          isLoaded(estimations) ?
          <List>
            {
              _.keys(estimations).map(k => {
                const meeting = estimations[k]
                const extendedMembersList = ExtendMembersList(meeting.members, meeting.team.members)
                return (
                  <List.Item className="text-color item-container" key={k}>
                    <div className="color-filler" style={{backgroundColor: meeting.team.color}}></div>
                    <List.Content>
                      <List.Header>{meeting.team.name} estimation</List.Header>
                      <MembersInTheList members={extendedMembersList} deleteMember={this.deleteMember} parent={k} />
                      <Button as={Link} to={`daily/ongoing/${k}`} className="join-button" inverted>Start</Button>
                      <div className="list-controls">
                        <Icon onClick={() => this.deleteEstimation(k)} className="trash-icon" size="large" name="trash" color="red" />
                      </div>
                    </List.Content>
                  </List.Item>
                )
              })
            }
            <AddListItemBox link="estimation/create" label="Add estimation meeting" />
          </List> :
          <SMLoader />
        }
      </Container>
    )
  }

	static propTypes = {
		firebase: PropTypes.object.isRequired,
		teams: PropTypes.object,
		meetings: PropTypes.object
  }
  
}