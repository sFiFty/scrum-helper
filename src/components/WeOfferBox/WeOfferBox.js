import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Button, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './styles.scss'

export default class WeOfferBox extends PureComponent {
  render() {
    return (
      <div className="we-offer-list">
        <h2 className="mb-4 font-xl text-center list-head">We offer</h2>
        <div className="d-flex justify-content-center">
          <div className="d-flex align-items-center flex-column offer-list-item mr-4 text-center">
            <h3 className="list-text text-center font-m">
              Team management
            </h3>
            <div className="list-image-container">
              <Image
                alt="Create your scrum Team"
                title="Create your scrum Team"
                src={require('Images/team-icon.png')}/>
            </div>
            <div className="list-description font-s">
              Create your team! Add/remove members and use this team for daily meetings.
            </div>
            <Button className="mt-auto" basic size="medium">Create Team</Button>
          </div>
          <div className="d-flex align-items-center flex-column offer-list-item ml-4 text-center">
            <h3 className="list-text font-m">
              Daily meetings
            </h3>
            <div className="list-image-container">
              <Image
                alt="Create your scrum daily meeting"
                title="Create your scrum daily meeting"
                src={require('Images/meeting-icon.png')}/>
            </div>
            <div className="list-description font-s">
              Create and hold a daily meeting! Use your existing team for that.
            </div>
            <Button className="mt-auto" basic size="medium">Create Daily</Button>
          </div>
        </div>
      </div>
    )
  }
}

