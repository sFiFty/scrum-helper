import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List, Image, Icon } from 'semantic-ui-react';


const propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    initials: PropTypes.string,
  })).isRequired,
  onRemoveMember: PropTypes.func.isRequired,
};

class TeamMembersList extends PureComponent {
  render() {
    const { members, onRemoveMember } = this.props;
    return (
      <List className="w-50 generated-items-list">
        {
          members.map((member, key) => (
            <List.Item key={key} className="member d-flex justify-content-start align-items-center">
              <Image avatar src={require(`Images/${member.avatar}`)} />
              <List.Content className="ml-2 font-s">
                {member.name} ({member.initials})
              </List.Content>
              <List.Content className="ml-auto font-s">
                <Icon
                  className="remove-item-icon"
                  role="button"
                  onClick={() => onRemoveMember(key)}
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

TeamMembersList.propTypes = propTypes;

export default TeamMembersList;
