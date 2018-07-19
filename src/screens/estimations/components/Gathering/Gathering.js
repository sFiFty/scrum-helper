import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import SMLoader from 'Components/SMLoader';
import { Container, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
  estimationId: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  estimation: PropTypes.object,
  auth: PropTypes.object,
};
export default class Gathering extends Component {
  state = {
    joinedMembers: [],
    tasks: [],
    isOwner: false,
  }

  componentWillReceiveProps({ estimation, auth }) {
    if (!estimation) return;
    const state = {};
    if (estimation.joinedMembers) {
      state.joinedMembers = this.getJoinedMembers(estimation.joinedMembers);
    }
    if (estimation.tasks) {
      state.tasks = this.getTasks(estimation.tasks);
    }
    if (auth && estimation.owner === auth.uid) {
      state.isOwner = true;
    }

    this.setState(state);
  }

  getJoinedMembers = (members) => {
    const joinedMembers = [];
    _.keys(members).map((memberKey) => {
      joinedMembers.push({ ...members[memberKey] });
    });
    return joinedMembers;
  }

  getTasks = (tasks) => {
    const estimationTasks = [];
    _.keys(tasks).map((taskKey) => {
      estimationTasks.push({ ...tasks[taskKey] });
    });
    return estimationTasks;
  }

  render() {
    const { joinedMembers, tasks, isOwner } = this.state;
    return (
      <Container className="gathering-container ">
        <div className="box d-flex flex-column flex-md-row justify-content-center">
          <div className="joined-members-container">
            <h3>
              {' '}
Joined members
              {' '}
            </h3>
            <ul className="joined-members-list">
              {
                joinedMembers.map((member, i) => {
                  const memberAvatar = require(`Images/${member.avatar}`);
                  return (
                    <li key={i} className="d-flex align-items-center">
                      <div className="member-image-box">
                        <Image avatar src={memberAvatar} />
                      </div>
                      <div className="member-name">
                        {member.name}
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </div>
          <div className="tasks-list-container">
            <h3>
Tasks to estimate
            </h3>
            <ul className="tasks-list font-m">
              {
                tasks.map((task, i) => (
                  <li key={i}>
                    {task.title}
                  </li>
                ))
              }
            </ul>
          </div>
          <Button secondary>
Start estimation
          </Button>
        </div>

      </Container>
    );
  }
}

Gathering.propTypes = propTypes;
