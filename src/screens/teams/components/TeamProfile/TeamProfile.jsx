import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  owner: PropTypes.string.isRequired,
};

class TeamProfile extends Component {
  onChange = () => {};

  render() {
    return (
      <div>
        Team Profile
      </div>
    );
  }
}

TeamProfile.propTypes = propTypes;

export default TeamProfile;
