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
    selectedMember: null,
    members: null
  }

  componentDidMount() {
    const {auth, estimationId, estimation} = this.props
    const {userKey} = this.state
    if (userKey === null && estimationId) this.setUserKey(auth, estimationId)
  }

  componentWillReceiveProps(props) {
    if (props.estimation) {
      this.setMembers(props.estimation)
    }
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

  setUserKey = (auth, estimationId) => {
    console.log(estimationId)
    if (!isLoaded(auth)) return
    isEmpty(auth) ? this.setAnonymousKey(estimationId) : this.setState({userKey: auth.uid})
  }

  setMembers = estimation => {
    if (!isLoaded(estimation)) return
    const {userKey} = this.state
    let members = this.generateMembers(estimation.team.members, estimation.members)
    let selectedMember = null
    members.map(member => {
      if (member.selected && userKey === member.selectedBy) {
        selectedMember = member.key
      }
    })
    members = members.filter(m => !m.selected || m.selectedBy === selectedMember)
    this.setState({members: members, selectedMember: selectedMember})
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
    const {userKey, members, selectedMember} = this.state
    return (
      <Container className="estimation-meeting-container text-center">
        <h2> Who are you? Please find yourself and click on its box. </h2>
        {
          members ?
            <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
              {
                members.map((member, i) => {
                  const memberAvatar = require(`Images/${member.avatar}`)
                  return (
                    <div key={i} className="member d-flex flex-row justify-content-center align-items-center" onClick={() => this.onSelectMember(members[i].key)} >
                      <div className="member-image-box">
                        <Image avatar src={memberAvatar} />
                      </div>
                      <div className="member-name">
                        {member.name}
                      </div>
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