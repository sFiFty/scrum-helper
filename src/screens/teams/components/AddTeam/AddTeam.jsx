import React from 'react';
import { CirclePicker } from 'react-color';
import {
  Container, Input, Form, Button, Message,
} from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';

import TeamMembers from './TeamMembers.jsx';
import './styles.scss';

const propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  owner: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default class AddTeam extends React.Component {
  state = {
    name: null,
    color: {
      hex: '#fff',
    },
    errorMessage: null,
    members: [],
    memberName: null,
    memberAvatar: null,
    isPopupOpen: false,
  };

  onPickColor = color => this.setState({ color: color.hex });

  onAddTeam = () => {
    const { name, color, members } = this.state;
    const { firebase, history, owner } = this.props;
    if (!name || name.length < 1) {
      this.setState({ errorMessage: 'Please provide team name' });
      return;
    }
    this.setState({ errorMessage: null });
    firebase.push('teams/', {
      name,
      color,
      owner,
      members,
    }).then((team) => {
      const membersToSave = {};
      members.map((member) => {
        membersToSave[firebase.push().key] = member;
      });
      firebase.push(`teams/${team.key}/members`, membersToSave);
      NotificationManager.success(
        `Team ${name} successfully created`,
        'Confirmation',
      );
      history.push('/teams');
    });
  }

  removeMember = (index) => {
    const { members } = this.state;
    members.splice(index, 1);
    this.setState({ members });
  }

  render() {
    const {
      errorMessage, color, members, memberAvatar, memberName, isPopupOpen,
    } = this.state;
    return (
      <Container>
        <h2 className="form-title">Add New Team</h2>
        <Form className="add" id="add-team">
          {
            errorMessage
              ? <Message color="red">0{errorMessage}</Message>
              : ''
          }
          <Form.Field className="name">
            <Input onChange={this.setName} size="massive" placeholder="Type team name here..." />
          </Form.Field>
          <Form.Field className="form-field">
            <label className="label font-m">Pick your team color</label>
            <CirclePicker name="color-picker" color={color} onChange={this.onPickColor} width="100%" circleSize={38} />
          </Form.Field>
          <Form.Field className="form-field team-members">
            <label htmlFor="team-members" className="label">Team members</label>
            <TeamMembers />
          </Form.Field>
          <Button onClick={this.onAddTeam} floated="right" size="medium" type="submit" secondary>
            Add Team
          </Button>
        </Form>
      </Container>
    );
  }
}

AddTeam.propTypes = propTypes;
