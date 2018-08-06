import React, { Component } from 'react';
import {
  Container, List, Icon, Transition, Label, Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import _ from 'lodash';

import MembersInTheList from 'Components/MembersInTheList';
import AddListItemBox from 'Components/AddListItemBox';
import SMLoader from 'Components/SMLoader';
import './styles.scss';

const propTypes = {
  firebase: PropTypes.shape({
    remove: PropTypes.func,
    updateProfile: PropTypes.func,
  }).isRequired,
  teams: PropTypes.shape({
    [PropTypes.string]: PropTypes.object,
  }),
  profile: PropTypes.shape({
    teamListMessageHidden: PropTypes.bool,
  }).isRequired,
};

const defaultProps = {
  teams: null,
};

export default class TeamList extends Component {
  deleteTeam = (key) => {
    const { firebase, teams } = this.props;
    firebase.remove(`teams/${key}/`).then(() => {
      NotificationManager.success(
        `Team ${teams[key].name} successfully deleted`,
        'Confirmation',
      );
    });
  }

  deleteMember = (member, teamid) => {
    const { firebase, teams } = this.props;
    firebase.remove(`teams/${teamid}/members/${member.id}`).then(() => {
      NotificationManager.success(
        `Member ${member.name} successfully removed from ${teams[teamid].name}`,
        'Confirmation',
      );
    });
  }

  handleDismiss = () => {
    const { firebase } = this.props;
    firebase.updateProfile({ teamListMessageHidden: true });
  }

  render() {
    const { teams, profile } = this.props;
    return (
      <Container className="list-container">
        <h2 className="list-title">
          My Teams
        </h2>
        {
          !profile.teamListMessageHidden
          && (
          <Message
            onDismiss={this.handleDismiss}
            header="Just hover on the team box to edit your team!"
            content="And press blue plus button!"
          />
          )
        }
        {
          isLoaded(teams)
            ? (
              <Transition.Group as={List} duration={500}>
                {
              _.keys(teams).map(k => (
                <List.Item className="text-color item-container" key={k}>
                  <div className="color-filler" style={{ backgroundColor: teams[k].color }} />
                  <List.Content>
                    <List.Header>
                      {teams[k].name}
                    </List.Header>
                    <MembersInTheList
                      members={teams[k].members}
                      parent={k}
                      deleteMember={this.deleteMember}
                    />
                    <div className="list-controls">
                      <Link to={`/teams/profile/${k}`} className="icon-border">
                        <Icon size="large" name="edit" />
                      </Link>
                      <Icon className="trash-icon" onClick={() => this.deleteTeam(k)} size="large" name="trash" color="red" />
                    </div>
                  </List.Content>
                  {
                    !teams[k].members
                    && (
                    <Label as="a" className="list-label" color="teal" ribbon="right">
                      Team is empty
                    </Label>
                    )
                  }
                </List.Item>
              ))
            }
                <AddListItemBox link="teams/add" label="Add team" />
              </Transition.Group>
            )
            : <SMLoader />
        }
      </Container>
    );
  }
}

TeamList.propTypes = propTypes;
TeamList.defaultProps = defaultProps;
