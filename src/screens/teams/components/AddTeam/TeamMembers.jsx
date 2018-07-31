import React from 'react';
import { List, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeMember: PropTypes.func.isRequired,
};

export default class TeamMembers extends React.Component {
  render() {
    const { members, removeMember } = this.props;
    return (
      members
      && (
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
                  onClick={() => removeMember(key)}
                  name="trash"
                  color="red"
                />
              </List.Content>
            </List.Item>
          ))
        }
      </List>
      )
    );
  }
}

TeamMembers.propTypes = propTypes;
