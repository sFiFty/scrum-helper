import React from 'react';
import PropTypes from 'prop-types';

import TeamMembersList from './components/TeamMembersList.jsx';
import AddTeamMembers from './components/AddTeamMembers.jsx';

const propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired, 
  onAddMember: PropTypes.func.isRequired,
};

export default class TeamMembers extends React.Component {
  state = {
    name: null,
    avatar: null,
    isPopupOpen: false,
  }

  onSetName = event => this.setState({ name: event.target.value });

  onSetAvatar = (avatar) => {
    this.setState({ avatar });
    setTimeout(() => this.setState({ isPopupOpen: false }), 50);
  }

  onPopupClose = () => this.setState({ isPopupOpen: false });

  onPopupOpen = () => this.setState({ isPopupOpen: true });

  addMember = () => {
    const { name, avatar } = this.state;
    const { onAddMember } = this.props;
    onAddMember({ name, avatar });
  }

  render() {
    const { members } = this.props;
    const { name, isPopupOpen, avatar } = this.state;
    return (
      members
      && (
        <div>
          <TeamMembersList {...this.props} />
          <AddTeamMembers />
        </div>

      )
    );
  }
}

TeamMembers.propTypes = propTypes;
