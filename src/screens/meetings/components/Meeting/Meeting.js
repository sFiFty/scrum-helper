import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import moment from 'moment'
import ExtendMembersList from 'Helpers/ExtendMembersList'
import './styles.scss'

const propTypes = {
  meeting: PropTypes.object.isRequired
}

export default class Meeting extends Component {

  render() {
    const { meeting, uid } = this.props
    const extendedMembersList = ExtendMembersList(meeting.members, meeting.team.members)
    const isOwner = meeting.owner.key === uid
    return (
      <div className="meeting d-flex flex-column">
        <div className="main-information d-flex justify-content-center align-items-center">
          <div className="owner-avatar">
            <Image src={meeting.owner.avatar} alt="meeting owner avatar" />
          </div>
          <div className="description">
            <div className="name font-m">
              <span>{meeting.type}</span> meeting
            </div>
            <div className="owner-email">
              {meeting.owner.email}
            </div>
            <div className="time font-m">
              10 : 20 AM
            </div>
          </div>
        </div>
        <div className="members-information">
          <div className="amount">
            {_.keys(extendedMembersList).length} Members Going
          </div>
          <div className="members d-flex align-items-center">
            {
              _.keys(extendedMembersList).map((memberKey, index) => {
                if (index >= 4) return
                return (
                  <Image 
                    src={require(`Images/${extendedMembersList[memberKey].avatar}`)} 
                    alt="member avatar" 
                    key={memberKey}
                  />
                )
              })
            }
            {
              _.keys(extendedMembersList).length - 4 > 0 &&
              <div className="others">
                + {_.keys(extendedMembersList).length - 4} <span>more</span> 
              </div>
            }
          </div>
        </div>
        <div className="button-container">
          <Link className="d-flex align-items-center justify-content-center" to={`meetings/${meeting.key}`}>
            <span className="font-m">{ isOwner ? 'Start' : 'Join' }</span>
          </Link>
        </div>
      </div>
    )
  }
}

Meeting.propTypes = propTypes