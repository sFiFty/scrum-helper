import React, {Component} from 'react'
import {List, Image, Button} from 'semantic-ui-react'
import ExtendMembersList from 'Helpers/ExtendMembersList'
import PropTypes from 'prop-types'

const doneTaskStatus = 'DONE'

export default class QueueSlide extends Component {
  state = {
    members: null,
    teamCard: null,
    tasks: {},
  }

  componentWillMount() {
    const {daily} = this.props
    this.setState({members: ExtendMembersList(daily.members, daily.team.members)})
  }

  componentDidMount() {
    const { trelloKey, trelloToken } = this.props;
    this.generateTasks(trelloKey, trelloToken).then(tasks => {
      this.getCardsForAllTeam(trelloKey, trelloToken).then(response => {
        return response.json();
      }).then(list => {
        const teamCard = list[Math.floor(Math.random()*list.length)].name;
        this.setState({ tasks, teamCard });
      })
      
    })
  }

  componentWillReceiveProps(nextProps) {
    const {daily} = nextProps
    this.setState({members: ExtendMembersList(daily.members, daily.team.members)})
  }

  markAsDone = (cardId) => {
    console.log(cardId);
  }

  markAsOngoing = (cardId) => {
    console.log(cardId);
  }

  generateTasks = (key, token) => {
    const tasks = {};
    const { members } = this.state;
    return new Promise((resolve, reject) => {
      Object.keys(members).map((memberKey, index) => {
        const initials = members[memberKey].initials;
        this.getCardsByColumnId(initials, key, token).then((response) => {
          return response.json();
        }).then(data => {
          this.setRandomCard(data, members, tasks, initials, resolve);
        })
      });
    });
  }

  setRandomCard = (cards, members, tasks, initials, resolve) => {
    const notDoneCards = cards.filter(card => {
      let status = true;
      if (card.labels) {
        card.labels.map(label => {
          if (label.name === doneTaskStatus) status = false
        })
      }
      return status;
    })
    tasks[initials] = notDoneCards[Math.floor(Math.random()*notDoneCards.length)];
    if (Object.keys(tasks).length === Object.keys(members).length) {
      resolve(tasks)
    }
  }

  getCardsByColumnId = (initials, key, token) => {
    const { trelloColumns } = this.props;
    const column = trelloColumns.find(column => column.name === initials);
    const url = `https://trello.com/1/lists/${column.id}/cards?key=${key}&token=${token}`
    return fetch(url);
  }

  getCardsForAllTeam = (key, token) => {
    const { trelloColumns } = this.props;
    const AllColumn = trelloColumns.find(column => column.name === 'ALL');
    const url = `https://trello.com/1/lists/${AllColumn.id}/cards?key=${key}&token=${token}`
    return fetch(url);
  }


  render() {
    const {members, tasks, teamCard} = this.state
    const {daily} = this.props
    console.log(tasks);
    return (
      <div key={daily.timestamp} style={{backgroundColor: daily.team.color}} className="page-overlay">
        <div className="daily-queue text-center">
          <div> Let's share our updates </div>
          <List className="queue-members">
            {
              _.keys(members).map((key, index) => {
                const member = members[key]
                const task = tasks[member.initials]
                return (
                  <List.Item key={index}>
                    <Image avatar src={require(`Images/${member.avatar}`)} />
                    <List.Content>
                      <List.Header>{member.name}</List.Header>
                    </List.Content>
                    {
                      task &&
                      <div className="promise">
                        <strong>Commitment: </strong>{task.name}
                        <Button onClick={() => this.markAsDone(task.id)} size='mini' color='green'>Done</Button>
                        <Button onClick={() => this.markAsOngoing(task.id)} size='mini' color='teal'>Ongoing</Button>
                      </div>
                    }
                  </List.Item>
                )
              })  
            }
            <List.Item>
              <List.Content className="team-promise">
                <h3> {daily.team.name} team commitment </h3>
                <div className="text-left promise">{teamCard}</div>
              </List.Content>
            </List.Item>
          </List>
        </div>
      </div>
    )
  }

	static propTypes = {
    daily: PropTypes.object.isRequired
	}
}