import React, {Component} from 'react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import {Container, Image, Icon} from 'semantic-ui-react'
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
    selectedMemberKey: null,
    members: null
  }

  componentDidMount() {
    const {auth, estimationId, estimation} = this.props
    const {userKey} = this.state
    if (userKey === null && estimationId) this.setUserKey(auth, estimationId)
  }

  componentWillReceiveProps({estimation}) {
    const {userKey} = this.state
    if (estimation) {
      console.log(1)
      this.setMembers(estimation, userKey)
    }
  }

  onSelectMember = memberKey => {
    const {firebase, estimationId} = this.props
    const {userKey, selectedMemberKey} = this.state
    if (selectedMemberKey === memberKey) return
    const membersPath = `estimationMeetings/${estimationId}/members`
    if (selectedMemberKey) {
      firebase.update(`${membersPath}/${selectedMemberKey}`, {selected: false, selectedBy: null}).then(() => {
        firebase.update(`${membersPath}/${memberKey}`, {selected: true, selectedBy: userKey}).then(() => {
          this.setState({selectedMemberKey: memberKey})
        })
      })
    } else {
      firebase.update(`${membersPath}/${memberKey}`, {selected: true, selectedBy: userKey}).then(() => {
        this.setState({selectedMemberKey: memberKey})
      })
    }
    
  }

  setUserKey = (auth, estimationId) => {
    if (!isLoaded(auth)) return
    isEmpty(auth) ? this.setAnonymousKey(estimationId) : this.setState({userKey: auth.uid})
  }

  setMembers = (estimation, userKey) => {
    if (!isLoaded(estimation)) return
    let members = this.generateMembers(estimation.team.members, estimation.members)
    let selectedMemberKey = null
    members.map(member => {
      if (member.selected && userKey === member.selectedBy) {
        selectedMemberKey = member.key
      }
    })
    members = members.filter(m => !m.selected || m.selectedBy === userKey)
    this.setState({members: members, selectedMemberKey: selectedMemberKey})
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
    selectedMembersArray.map(member => {
      members.push({
        avatar: allMembers[member.key].avatar,
        ...member
      })
    })
    return members
  }

  membersToArray = members => {
    let membersArray = []
    _.keys(members).map(key => {
      membersArray.push({
        key: key,
        ...members[key]
      })
    })
    return membersArray
  }

  generateHash = () => Math.random().toString(36).substring(7)

  render() {
    const {userKey, members, selectedMemberKey} = this.state
    console.log(members)
    return (
      <Container className="estimation-meeting-container text-center">
        <h2> Who are you? Please find yourself and click on its box. </h2>
        {
          members ?
          <div className="d-flex flex-row justify-content-center align-items-center flex-wrap selectable">
            {
              members.map((member, i) => {
                const memberAvatar = require(`Images/${member.avatar}`)
                const selectedClass = member.selected ? 'selected' : ''
                const classes = `${selectedClass} member d-flex flex-row justify-content-center align-items-center`
                return (
                  <div 
                    key={i} 
                    className={classes} 
                    onClick={() => this.onSelectMember(members[i].key)} 
                  >
                    <div className="member-image-box">
                      <Image avatar src={memberAvatar} />
                    </div>
                    <div className="member-name">
                      {member.name}
                    </div>
                    <Icon className="checkmark-icon" size="big" name="checkmark" color="black" />
                    <div className="overlay-block"></div>
                  </div>
                )
              })
            }
          </div>

          :
          <SMLoader />
        }
      </Container>
    )
  }
}

Estimation.propTypes = propTypes