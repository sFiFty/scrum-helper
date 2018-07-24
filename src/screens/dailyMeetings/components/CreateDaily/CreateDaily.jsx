import React, { Component } from 'react';
import {
  Container, Form, Button, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { isLoaded } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';

import SMLoader from 'Components/SMLoader';
import SelectableTeams from 'Components/SelectableTeams';
import SelectableMembers from './SelectableMembers.jsx';
import './styles.scss';

const propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  teams: PropTypes.shape({
    [PropTypes.string]: PropTypes.object,
  }),
  owner: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const defaultProps = {
  teams: null,
};

export default class CreateDaily extends Component {
  state = {
    selectedTeamId: null,
    selectedNames: [],
    selectedMembers: [],
    allMembers: [],
    startTime: moment(),
  }

  componentDidMount() {
    console.log(this.props)
  }

  componentWillMount() {
    this.setDefaultTeam(this.props);
  }

  componentWillReceiveProps(props) {
    this.setDefaultTeam(props);
  }

  onAddMember = (e, { value, options }) => {
    const selectedMembers = options.filter(member => value.indexOf(member.value) !== -1);
    this.setState({ selectedNames: value, selectedMembers });
  }

  onChangeTime = time => this.setState({ startTime: time })


  onCreateDaily = () => {
    const {
      teams, firebase, history, owner,
    } = this.props;
    const { selectedMembers, selectedTeamId, startTime } = this.state;
    if (!teams) {
      NotificationManager.error('You can\'t create daily without team', 'Error');
      return;
    }

    const members = {};
    this.shuffle(selectedMembers).map((member, index) => {
      members[index] = {
        id: member.key,
      };
    });

    firebase.push('dailyMeetings/', {
      team: selectedTeamId,
      owner,
      members,
      timestamp: moment().unix(),
      startTime: moment(startTime).unix(),
      step: 0,
    }).then(() => {
      NotificationManager.success(
        `Daily for ${teams[selectedTeamId].name} successfully created`,
        'Confirmation',
      );
      history.push('/meetings');
    });
  }

  setDefaultTeam = (props) => {
    const { teams } = props;
    const { selectedTeamId } = this.state;
    if (!teams || selectedTeamId) return;
    this.generateValues(teams, Object.keys(teams)[0]);
  }

  generateValues = (teams, teamId) => {
    const allMembers = [];
    const membersNames = [];
    const { members } = teams[teamId];
    Object.keys(members).map((memberKey) => {
      const member = members[memberKey];
      const avatarUrl = `Images/${member.avatar}`;
      const avatar = member.avatar ? require(avatarUrl) : null;
      allMembers.push({
        value: member.name,
        key: memberKey,
        text: member.name,
        content: (
          <div>
            <Image avatar src={avatar} />
            <span>
              {member.name}
            </span>
          </div>
        ),
      });
      membersNames.push(member.name);
    });

    this.setState({
      allMembers,
      selectedMembers: allMembers,
      selectedNames: membersNames,
      selectedTeamId: teamId,
    });
  }

  selectTeam = (key) => {
    const { teams } = this.props;
    this.generateValues(teams, key);
  }

  shuffle = (array) => {
    const arrayToReturn = array;
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayToReturn[i], arrayToReturn[j]] = [arrayToReturn[j], arrayToReturn[i]];
    }
    return arrayToReturn;
  }

  render() {
    const {
      selectedTeamId, allMembers, selectedNames, startTime,
    } = this.state;
    const { teams } = this.props;
    return (
      <Container>
        {
          !isLoaded(teams) && <SMLoader />
        }
        {
          isLoaded(teams) && (
            <div>
              <h2 className="form-title">Create Daily Meeting</h2>
              <Form className="add">
                {
                  teams ? (
                    <SelectableTeams
                      teams={teams}
                      selectTeam={this.selectTeam}
                      selectedTeamId={selectedTeamId}
                    />
                  ) : (
                    <div className="text-center">
                      <h1>To create daily you need to have one team at least.</h1>
                      <Button as={Link} to="/teams/add" className="mt-4" secondary size="medium">Create Team</Button>
                    </div>
                  )
                }
                <SelectableMembers
                  members={allMembers}
                  selectedTeamId={selectedTeamId}
                  onAddMember={this.onAddMember}
                  selectedNames={selectedNames}
                />
                <Form.Field>
                  <DatePicker
                    selected={startTime}
                    onChange={this.onChangeTime}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={10}
                    dateFormat="LLL"
                    timeCaption="time"
                  />
                </Form.Field>
                <Button
                  onClick={this.onCreateDaily}
                  floated="right"
                  disabled={!teams}
                  size="medium"
                  type="submit"
                  secondary
                >
                  Create Daily
                </Button>
              </Form>
            </div>
          )
        }
      </Container>
    );
  }
}

CreateDaily.propTypes = propTypes;
CreateDaily.defaultProps = defaultProps;
