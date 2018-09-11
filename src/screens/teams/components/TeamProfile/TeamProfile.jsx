import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Input, Form, List, Icon, Image,
} from 'semantic-ui-react';
import { CirclePicker } from 'react-color';

import TeamMembers from '../TeamMembers';

const propTypes = {
  owner: PropTypes.string.isRequired,
  profileObj: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

class TeamProfile extends Component {
  state = {
    isPopupOpen: false,
    memberAvatar: null,
    memberName: null,
  }
  onChange = () => {};

  render() {
    const { profileObj } = this.props;
    const team = profileObj;
    const members = Object.keys(team.members, (memberId => (
      {
        
      }
    )));
    const { isPopupOpen, memberAvatar, memberName } = this.state;
    return (
      <Container>
        <Form className="add" id="add-team">
          <Form.Field className="name">
            <Input value={team.name} onChange={this.setName} size="massive" placeholder="Type team name here..." />
          </Form.Field>
          <Form.Field className="form-field">
            <label className="label font-m">Pick your team color</label>
            <CirclePicker name="color-picker" color={team.color} onChange={this.onPickColor} width="100%" circleSize={38} />
          </Form.Field>
        </Form>
        <Form.Field className="form-field team-members">
          <label htmlFor="team-members" className="label">Team members</label>
          
          <TeamMembers
            members={members}
            memberAvatar={memberAvatar}
            memberName={memberName}
            isPopupOpen={isPopupOpen}
          />
        </Form.Field>
      </Container>
    );
  }
}

TeamProfile.propTypes = propTypes;

export default TeamProfile;
