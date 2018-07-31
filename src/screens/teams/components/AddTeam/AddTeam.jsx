import React from 'react';
import { CirclePicker } from 'react-color';
import {
  Container, Input, Form, Button, Message, Popup, Image,
} from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import DefaultAvatars from 'Components/DefaultAvatars';
import TeamMembers from './TeamMembers';
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

  onPopupClose = () => this.setState({ isPopupOpen: false });

  onPopupOpen = () => this.setState({ isPopupOpen: true });

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

  setName = event => this.setState({ name: event.target.value });

  setMemberAvatar = (avatar) => {
    this.setState({ memberAvatar: avatar });
    setTimeout(() => this.setState({ isPopupOpen: false }), 50);
  }

  setMemberName = event => this.setState({ memberName: event.target.value })

  removeMember = (index) => {
    const { members } = this.state;
    members.splice(index, 1);
    this.setState({ members });
  }

  addMember = () => {
    const { memberName, memberAvatar, members } = this.state;
    members.push({
      name: memberName,
      avatar: memberAvatar,
    });
    this.setState({
      memberAvatar: null,
      memberName: null,
      members,
    });
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
            <div className="d-flex justify-content-start align-items-center">
              <Input
                onChange={this.setMemberName}
                value={memberName || ''}
                className="w-50"
                size="mini"
                placeholder="Type member name here..."
              />
              <Popup
                open={isPopupOpen}
                onOpen={this.onPopupOpen}
                onClose={this.onPopupClose}
                on="click"
                trigger={(
                  <Button className="ml-3 d-flex justify-content-start align-items-center" size="mini" basic>
                    {
                      memberAvatar
                      && <Image avatar src={require(`Images/${memberAvatar}`)} />
                    }
                    <span className={memberAvatar && 'ml-2'}>Choose avatar</span>
                  </Button>
                )}
              >
                <DefaultAvatars selectedAvatar={memberAvatar} onChoose={this.setMemberAvatar} />
              </Popup>
              {
              memberAvatar && memberName
                && (
                  <Button onClick={this.addMember} className="ml-3" size="mini" secondary>
                    <span>Add</span>
                  </Button>
                )
              }
            </div>
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
