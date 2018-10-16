import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Input, Form, Button,
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
    team: null,
    isPopupOpen: false,
    memberAvatar: null,
    memberName: null,
  }

  componentWillMount() {
    const { profileObj } = this.props;
    const members = profileObj.members ? Object.values(profileObj.members) : [];
    this.setState({ team: profileObj, members });
  }

  onPickColor = (color) => {
    const { team } = this.state;
    this.setState({ team: { ...team, color } });
  };

  onSetName = (event) => {
    const { team } = this.state;
    this.setState({ team: { ...team, name: event.target.value } });
  };

  onAddMember = (member) => {
    const { members } = this.state;
    members.push(member);
    this.setState({ members });
  }

  onRemoveMember = (member) => console.log(member)

  render() {
    const { team, members } = this.state;
    const { isPopupOpen, memberAvatar, memberName } = this.state;
    return (
      <Container>
        <Form className="profile" id="add-team">
          <Form.Field className="name">
            <Input
              value={team.name}
              onChange={this.onSetName}
              size="massive"
              placeholder="Type team name here..."
            />
          </Form.Field>
          <Form.Field className="form-field">
            <label className="label font-m">Pick your team color</label>
            <CirclePicker
              name="color-picker"
              color={team.color}
              onChange={this.onPickColor}
              width="100%"
              circleSize={38}
            />
          </Form.Field>
          <Form.Field className="form-field team-members">
            <label htmlFor="team-members" className="label">Team members</label>
            <TeamMembers
              members={members}
              memberAvatar={memberAvatar}
              memberName={memberName}
              isPopupOpen={isPopupOpen}
              onAddMember={this.onAddMember}
              onRemoveMember={this.onRemoveMember}
            />
          </Form.Field>
          <Button onClick={this.onAddTeam} floated="right" size="medium" type="submit" secondary>
            Update team
          </Button>
        </Form>
      </Container>
    );
  }
}

TeamProfile.propTypes = propTypes;

export default TeamProfile;
