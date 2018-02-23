import React, {Component} from 'react'
import {List, Image} from 'semantic-ui-react'
import ExtendMembersList from 'Helpers/ExtendMembersList'

export default class QueueSlide extends Component {
  state: {
    members: null
  }
  componentWillMount() {
    const {daily} = this.props
    this.setState({members: ExtendMembersList(daily.members, daily.team.members)})
  }
  componentWillReceiveProps(nextProps) {
    const {daily} = nextProps
    this.setState({members: ExtendMembersList(daily.members, daily.team.members)})
  }
  render() {
    const {members} = this.state
    const {daily} = this.props
    return (
      <div key={daily.timestamp} style={{backgroundColor: daily.team.color}} className="page-overlay">
        <div className="daily-queue text-center">
          <div> Let's share our updates </div>
          <List className="queue-members">
          {
            _.keys(members).map((key, index) => {
              let member = members[key]
              return (
                <List.Item key={index}>
                  <Image avatar src={require(`Images/${member.avatar}`)} />
                  <List.Content>
                    <List.Header>{member.name}</List.Header>
                  </List.Content>
                </List.Item>
              )
            })  
          }
          </List>
        </div>
      </div>
    )
  }
}