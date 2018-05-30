import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Image } from 'semantic-ui-react'
import moment from 'moment'
import './styles.scss'

const propTypes = {
  meeting: PropTypes.object.isRequired
}

export default class Meeting extends Component {

  render() {
    const { meeting } = this.props
    console.log(meeting)
    return (
      <div className="meeting">
        <div className="main-information">
          <div className="owner-avatar">
            <Image src={meeting.owner.avatar} alt="meeting owner avatar" />
          </div>
          <div className="description">
            <div className="name">
              <span>{meeting.type}</span> meeting
            </div>
            <div className="owner-email">
              {meeting.owner.email}
            </div>
            <div className="time">
              10 : 30 AM
            </div>
          </div>
        </div>
        <div className="members-information">
          <div className="amount">
            {_.keys(meeting.members).length}
          </div>
        </div>
        <div className="button-container">
          Join
        </div>
      </div>
    )
  }
}

Meeting.propTypes = propTypes