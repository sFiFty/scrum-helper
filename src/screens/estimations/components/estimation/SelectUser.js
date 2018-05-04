import React, {Component} from 'react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import {Image, Icon, Button} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './styles.scss'

const propTypes = {
  estimationId: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  estimation: PropTypes.object.isRequired,
  userKey: PropTypes.string.isRequired
}

export default class SelectUser extends Component {

  state = {
    selectedMemberKey: null,
    members: null
  }

  componentDidMount() {
    this.setMembers(this.props.estimation, this.props.userKey)
  }

  componentWillReceiveProps({estimation, userKey}) {
    this.setMembers(estimation, userKey)
  }

  onStartEstimation = () => {
    const {firebase, estimationId, history} = this.props
    const {members, selectedMemberKey} = this.state
    const selectedMember = members.find(m => m.key === selectedMemberKey)
    firebase.push(`estimationMeetings/${estimationId}/joinedMembers`, selectedMember).then(() => {
      history.push(`estimation/ongoing/${estimationId}/gathering`)
    })
  }

  onSelectMember = memberKey => {
    const {firebase, estimationId, userKey} = this.props
    const {selectedMemberKey} = this.state
    if (selectedMemberKey === memberKey) return
    const membersPath = `estimationMeetings/${estimationId}/members`
    if (selectedMemberKey) {
      firebase.update(`${membersPath}/${selectedMemberKey}`, {selected: false, selectedBy: null}).then(() => {
        setTimeout(() => {
          firebase.update(`${membersPath}/${memberKey}`, {selected: true, selectedBy: userKey}).then(() => {
            this.setState({selectedMemberKey: memberKey})
          })
        }, 0)
      })
    } else {
      firebase.update(`${membersPath}/${memberKey}`, {selected: true, selectedBy: userKey}).then(() => {
        this.setState({selectedMemberKey: memberKey})
      })
    }
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

  render() {
    const {members, selectedMemberKey} = this.state
    return (
      <div>
        <h2> Who are you? Please find yourself and click on its box. </h2>
        {
          <div className="d-flex flex-row justify-content-center align-items-center flex-wrap selectable">
            {
              members &&
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
            {
              selectedMemberKey &&
              <div className="button-container">
                <Button 
                  onClick={this.onStartEstimation} 
                  size="medium" 
                  type="submit" 
                  secondary>
                  Let's estimate!
                </Button>
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

SelectUser.propTypes = propTypes