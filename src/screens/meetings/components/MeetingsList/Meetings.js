import React, {Component} from 'react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import {Container, Image, Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './styles.scss'

const propTypes = {
  dailyMeetings: PropTypes.object,
  estimationMeetings: PropTypes.object
}
export default class Meetings extends Component {
  render() {
    const {joinedMembers, tasks, isOwner} = this.state
    return (
      <Container className="meetings-container">

      </Container>
    )
  }
}

Meetings.propTypes = propTypes