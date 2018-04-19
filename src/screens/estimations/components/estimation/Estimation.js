import React, {Component} from 'react'
import {isLoaded} from 'react-redux-firebase'
import PropTypes from 'prop-types'
import SMLoader from 'Components/SMLoader'
import { Container, Image } from 'semantic-ui-react';

export default class Estimation extends Component {


  render() {
    const {estimation} = this.props
    let members = []
    if (estimation) {
      members = this.generateMembers(estimation.team.members, estimation.members)
    }
    
    return (
      <Container>
        {
          isLoaded(estimation) ?
            members.map((member, i) => {
              const memberAvatar = require(`Images/${member.avatar}`)
              return (
                <div key={i} className="member">
                  <div className="member-image-box">
                    <Image avatar src={memberAvatar} />
                  </div>
                  <div className="member-name">
                    {member.name}
                  </div>
                </div>
              )
            })
          :
          <SMLoader />
        }
      </Container>
    )
  }

  generateMembers = (allMembers, selectedMembers) => {
    let members = []
    const selectedMembersArray = this.membersToArray(selectedMembers)
    _.keys(allMembers).map(key => {
      if (selectedMembersArray.indexOf(key) > -1) {
        members.push(allMembers[key])
      }
    })
    return members
  }

  membersToArray = members => {
    let membersArray = []
    _.keys(members).map(key => {
      membersArray.push(members[key].id)
    })
    return membersArray
  }

	static propTypes = {
		estimationId: PropTypes.string.isRequired,
		estimation: PropTypes.object,
		firebase: PropTypes.object.isRequired
	}
}