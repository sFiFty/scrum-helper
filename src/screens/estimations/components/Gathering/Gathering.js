import React, {Component} from 'react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import {Container, Image} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './styles.scss'

const propTypes = {
  estimationId: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  estimation: PropTypes.object,
  auth: PropTypes.object
}
export default class Gathering extends Component {
  state = {
    joinedMembers: []
  }
  componentWillReceiveProps({estimation}) {
    if (estimation && estimation.joinedMembers) {
      let joinedMembers = []
      _.keys(estimation.joinedMembers).map(memberKey => {
        joinedMembers.push(
          {
            ...estimation.joinedMembers[memberKey]
          }
        )
      })
      this.setState({ joinedMembers: joinedMembers })
    }
  }
  render() {
    const {joinedMembers} = this.state

    return (
      <Container className="gathering-container">
        <div className="joined-members-container">
          <h3> Joined members </h3>
          <ul className="joined-members-list">
            {
              joinedMembers.map((member, i) => {
                const memberAvatar = require(`Images/${member.avatar}`)
                return <li key={i} className="d-flex align-items-center">
                  <div className="member-image-box">
                    <Image avatar src={memberAvatar} />
                  </div>
                  <div className="member-name">
                    {member.name}
                  </div>
                </li>
              })
            }
          </ul>
        </div>
      </Container>
    )
  }
}

Gathering.propTypes = propTypes