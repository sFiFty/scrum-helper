import React, { Component } from 'react';
import { List, Image, Button } from 'semantic-ui-react';
import ExtendMembersList from 'Helpers/ExtendMembersList';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';

const doneLabel = 'DONE';
const ongoingLabel = 'Ongoing';
const cancelLabel = 'CANCEL';

export default class QueueSlide extends Component {
  state = {
    members: null,
    teamCard: null,
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

  setMemberCommitmentToFinished = (member) => {
    const { members } = this.state;
    Object.keys(members).map((key) => {
      if (members[key].name === member.name) {
        members[key].commitment.isFinished = true;
      }
    });
    return members;
  }

  markAsDone = member => (
    this.markCommitment(member, doneLabel).then(() => {
      NotificationManager.success(
        `Commitment ${member.commitment.name} was successfully DONE!`,
        'Nice job!',
      );
    })
  )

  markAsOngoing = member => (
    this.markCommitment(member, ongoingLabel).then(() => {
      NotificationManager.success(
        `Commitment ${member.commitment.name} was successfully saved as ongoing!`,
        'Keep doing it!',
      );
    })
  )

  markAsCanceled = member => (
    this.markCommitment(member, cancelLabel).then(() => {
      NotificationManager.success(
        `Commitment ${member.commitment.name} was successfully saved as CANCELED!`,
        'Hope you understand that you do!',
      );
    })
  )

  markCommitment = (member, labelName) => {
    const { daily } = this.props;
    const label = daily.team.board.labels.find(l => l.name === labelName);
    const members = this.setMemberCommitmentToFinished(member);
    this.setState({ members });
    return window.Trello.rest('put', `cards/${member.commitment.id}?idLabels=${label.id}`);
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
                      member.commitment && !member.commitment.isFinished && (
                        <div className="promise">
                          <strong>Commitment: </strong>
                          {member.commitment.name}
                          <div className="trello-actions-container">
                            <Button basic onClick={() => this.markAsDone(member)} size="mini" color="green">
                              Done
                            </Button>
                            <Button basic onClick={() => this.markAsOngoing(member)} size="mini" color="teal">
                              Ongoing
                            </Button>
                            <Button basic onClick={() => this.markAsCanceled(member)} size="mini" color="red">
                              Cancel
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
