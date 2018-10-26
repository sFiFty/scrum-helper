import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Input, Form, Button, Checkbox, Divider, Message,
} from 'semantic-ui-react';
import { CirclePicker } from 'react-color';
import { NotificationManager } from 'react-notifications';

import TeamMembers from '../TeamMembers';
import TrelloIntegration from '../TrelloIntegration';

const propTypes = {
  profileObj: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  firebase: PropTypes.shape({
    update: PropTypes.func.isRequired,
  }).isRequired,
};

class TeamProfile extends Component {
  state = {
    team: null,
    members: [],
    errorMessage: null,
    withTrelloIntegration: this.props.profileObj.board,
  }

  componentWillMount() {
    const { profileObj } = this.props;
    const members = Object.values(profileObj.members);
    this.setState({ team: profileObj, members, withTrelloIntegration: !!profileObj.board });
  }

  onPickColor = (color) => {
    const { team } = this.state;
    this.setState({ team: { ...team, color: color.hex } });
  };

  onSetName = (event) => {
    const { team } = this.state;
    this.setState({ team: { ...team, name: event.target.value } });
  };

  onSetBoard = (board) => {
    const { team } = this.state;
    this.setState({ team: { ...team, board } });
  }

  onAddMember = (member) => {
    const { members } = this.state;
    members.push(member);
    this.setState({ members });
  }

  onRemoveMember = (index) => {
    const { members } = this.state;
    members.splice(index, 1);
    this.setState({ members });
  }

  onSetTrelloTeamCommitments = teamCommitments => this.setState({ teamCommitments });

  onUpdateTeam = () => {
    const { members, team, teamCommitments } = this.state;
    const { match, firebase } = this.props;
    if (!team.name || team.name.length < 1) {
      this.setState({ errorMessage: 'Please provide team name' });
      return;
    }
    this.setState({ errorMessage: null });
    firebase.update(`teams/${match.params.teamid}`, { ...team, members, teamCommitments }).then(() => {
      NotificationManager.success(
        `Team ${team.name} was successfully updated`,
        'Confirmation',
      );
    });
  }

  onTurnOnOffTrelloIntegration = (event, element) => (
    this.setState({ withTrelloIntegration: element.checked })
  )

  onSetTrelloCommitments = (commitments, selectedMember) => {
    const { members } = this.state;
    members[members.indexOf(selectedMember)].commitments = commitments;
    NotificationManager.success(
      `Commitments for ${selectedMember.name} was successfully synchronized`,
      'Confirmation',
    );
  }

  render() {
    const {
      team, members, errorMessage, withTrelloIntegration,
    } = this.state;
    return (
      <Container>
        <Form className="profile" id="team-profile">
          {
            errorMessage
              ? <Message color="red">{errorMessage}</Message>
              : ''
          }
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
              key={members.length}
              members={members}
              onAddMember={this.onAddMember}
              onRemoveMember={this.onRemoveMember}
            />
          </Form.Field>
          <Checkbox
            toggle
            checked={withTrelloIntegration}
            onChange={this.onTurnOnOffTrelloIntegration}
            label="Add trello integration"
          />
          {
            withTrelloIntegration && (
              <React.Fragment>
                <Divider horizontal>Trello integration</Divider>
                <TrelloIntegration
                  {...this.props}
                  team={team}
                  onSetBoard={this.onSetBoard}
                  members={members}
                  onSetTrelloCommitments={this.onSetTrelloCommitments}
                  onSetTrelloTeamCommitments={this.onSetTrelloTeamCommitments}
                />
              </React.Fragment>
            )
          }
          <Button onClick={this.onUpdateTeam} floated="right" size="medium" type="submit" secondary>
            Update team
          </Button>
        </Form>
      </Container>
    );
  }
}

TeamProfile.propTypes = propTypes;

export default TeamProfile;
