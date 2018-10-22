import React, { Component } from 'react';
import { List, Image, Button } from 'semantic-ui-react';
import ExtendMembersList from 'Helpers/ExtendMembersList';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';

const doneTaskStatus = 'DONE';
const ongoingTaskStatus = 'Ongoing';

export default class QueueSlide extends Component {
  state = {
    members: null,
    teamCard: null,
    tasks: {},
  }

  componentWillMount() {
    const { daily } = this.props;
    const members = ExtendMembersList(daily.members, daily.team.members);
    Object.keys(members).map((memberKey) => {
      const member = members[memberKey];
      let { commitments } = member;
      if (commitments) {
        commitments = commitments.filter(c => !c.labels);
        member.commitments = commitments;
        member.commitment = commitments[Math.floor(Math.random() * commitments.length)];
      }
    });
    this.setState({ members });
  }

  markAsDone = (card) => {
    const { trelloLabels, trelloKey, trelloToken } = this.props;
    const cards = this.markCardAsFinished(card);
    const label = trelloLabels.find(label => label.name === 'DONE');
    const url = `https://api.trello.com/1/cards/${card.id}?idLabels=${label.id}&key=${trelloKey}&token=${trelloToken}`;
    fetch(url, { method: 'PUT' }).then(() => {
      this.setState({ tasks: cards }, () => {
        NotificationManager.success(
          `Commitment ${card.name} was successfully DONE!`,
          'Nice job!',
        );
      });
    });
  }

  markAsOngoing = (card) => {
    const { trelloLabels, trelloKey, trelloToken } = this.props;
    const cards = this.markCardAsFinished(card);
    const label = trelloLabels.find(label => label.name === 'Ongoing');
    const url = `https://api.trello.com/1/cards/${card.id}?idLabels=${label.id}&key=${trelloKey}&token=${trelloToken}`;
    fetch(url, { method: 'PUT' }).then(() => {
      this.setState({ tasks: cards }, () => {
        NotificationManager.success(
          `Commitment ${card.name} was successfully saved as ongoing!`,
          'Keep doing it!',
        );
      });
    });
  }

  markCardAsFinished = (card) => {
    const { tasks } = this.state;
    Object.keys(tasks).map((initials) => {
      if (!tasks[initials]) return;
      if (tasks[initials].id === card.id) {
        tasks[initials].finished = true;
      }
    });
    return tasks;
  }

  generateTasks = (key, token) => {
    const tasks = {};
    const { members } = this.state;
    return new Promise((resolve, reject) => {
      Object.keys(members).map((memberKey, index) => {
        const initials = members[memberKey].initials;
        this.getCardsByColumnId(initials, key, token).then(response => response.json()).then((data) => {
          this.setRandomCard(data, members, tasks, initials, resolve);
        });
      });
    });
  }

  render() {
    const { members, teamCard } = this.state;
    const { daily } = this.props;
    return (
      <div key={daily.timestamp} style={{ backgroundColor: daily.team.color }} className="page-overlay">
        <div className="daily-queue text-center">
          <div>Let's share our updates</div>
          <List className="queue-members">
            {
              Object.keys(members).map((key, index) => {
                const member = members[key];
                return (
                  <List.Item key={index}>
                    <Image avatar src={require(`Images/${member.avatar}`)} />
                    <List.Content>
                      <List.Header>
                        {member.name}
                      </List.Header>
                    </List.Content>
                    {
                      member.commitment && (
                        <div className="promise">
                          <strong>Commitment: </strong>
                          {member.commitment.name}
                          <div className="trello-actions-container">
                            <Button basic onClick={() => this.markAsDone(member.commitment.id)} size="mini" color="green">
                              Done
                            </Button>
                            <Button basic onClick={() => this.markAsOngoing(member.commitment.id)} size="mini" color="teal">
                              Ongoing
                            </Button>
                          </div>
                        </div>
                      )
                    }
                  </List.Item>
                );
              })
            }
            <List.Item>
              <List.Content className="team-promise">
                <h3>
                  {' '}
                  {daily.team.name}
                  {' '}
team commitment
                  {' '}
                </h3>
                <div className="text-left promise">
                  {teamCard}
                </div>
              </List.Content>
            </List.Item>
          </List>
        </div>
      </div>
    );
  }

	static propTypes = {
	  daily: PropTypes.object.isRequired,
	}
}
