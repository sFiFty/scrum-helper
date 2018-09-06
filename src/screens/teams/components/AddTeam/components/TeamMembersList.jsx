import React, { Component } from 'react';
import { List, Image, Icon } from 'semantic-ui-react';

class TeamMembersList extends Component {
  render() {
    return (
      <List className="w-50 generated-items-list">
        {
          members.map((member, key) => (
            <List.Item key={key} className="member d-flex justify-content-start align-items-center">
              <Image avatar src={require(`Images/${member.avatar}`)} />
              <List.Content className="ml-2 font-s">
                {member.name}
              </List.Content>
              <List.Content className="ml-auto font-s">
                <Icon
                  className="remove-item-icon"
                  role="button"
                  onClick={() => this.removeMember(key)}
                  name="trash"
                  color="red"
                />
              </List.Content>
            </List.Item>
          ))
        }
      </List>
    );
  }
}

export default TeamMembersList;