import React from 'react';
import PropTypes from 'prop-types';

import TeamMembersList from './components/TeamMembersList.jsx';
import AddTeamMembers from './components/AddTeamMembers.jsx';

const propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default class TeamMembers extends React.Component {
  render() {
    const { members } = this.props;
    return (
      members
      && (
        <div>
          <TeamMembersList {...this.props} />
          <AddTeamMembers {...this.props} />
        </div>

      )
    );
  }
}

TeamMembers.propTypes = propTypes;
