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
export default class Estimation extends Component {

  state = {
    userKey: null,
    selectedMember: null
  }

  componentDidMount() {
    const {auth, estimationId} = this.props
    if (!isLoaded(auth)) return
    isEmpty(auth) ? this.setAnonymousKey() : this.setState({userKey: auth.uid})
  }

  onSelectMember = memberKey => {
    const {firebase, estimationId} = this.props
    const {userKey, selectedMember} = this.state
    if (selectedMember === memberKey) return
    const membersPath = `estimationMeetings/${estimationId}/members`
    if (selectedMember) {
      firebase.update(`${membersPath}/${selectedMember}`, {selected: false, selectedBy: null}).then(() => {
        firebase.update(`${membersPath}/${memberKey}`, {selected: true, selectedBy: userKey}).then(() => {
          this.setState({selectedMember: memberKey})
        })
      })
    } else {
      firebase.update(`${membersPath}/${memberKey}`, {selected: true, selectedBy: userKey}).then(() => {
        this.setState({selectedMember: memberKey})
      })
    }
    
  }

  setAnonymousKey = meetingId => {
    if (localStorage.getItem(meetingId)) {
      this.setState({userKey: localStorage.getItem(meetingId)})
    } else {
      const key = this.generateHash()
      localStorage.setItem(meetingId, key)
      this.setState({userKey: key})
    }
  }
 
  generateMembers = (allMembers, selectedMembers) => {
    let members = []
    const selectedMembersArray = this.membersToArray(selectedMembers)
    _.keys(allMembers).map(key => {
      if (selectedMembersArray.indexOf(key) > -1) {
        members.push({
          key: key,
          ...allMembers[key]
        })
      }
    })
    return members
  }

  membersToArray = members => {
    let membersArray = []
    _.keys(members).map(key => {
      membersArray.push(key)
    })
    return membersArray
  }

  generateHash = () => Math.random().toString(36).substring(7)

  render() {
    const {estimation} = this.props
    const {userKey} = this.state
    let members = []
    if (estimation) {
      members = this.generateMembers(estimation.team.members, estimation.members)
    }
    
    return (
      <Container className="estimation-meeting-container">
        {
          isLoaded(estimation) ?
            members.map((member, i) => {
              const memberAvatar = require(`Images/${member.avatar}`)
              return (
                <div key={i} className="member" onClick={() => this.onSelectMember(members[i].key)} >
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
}

Estimation.propTypes = propTypes