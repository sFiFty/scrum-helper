import React, { Component } from 'react';
import {
  Container, Input, Form, Button, Message,
} from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';

import DefaultAvatars from 'Components/DefaultAvatars';
import './styles.scss';

const propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  team: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      teamid: PropTypes.string,
    }),
  }).isRequired,
};

class AddMember extends Component {
  state = {
    name: null,
    errorMessage: null,
    initials: null,
    avatar: null,
  };

  onChooseAvatar = avatar => this.setState({ avatar })

  setName = event => this.setState({ name: event.target.value })

  setInitials = event => this.setState({ initials: event.target.value })

  selectAvatar = (selectedIndex) => {
    const { defaultAvatarsList } = this.state;
    const avatars = defaultAvatarsList.map((a, i) => {
      const avatar = a;
      avatar.selected = selectedIndex === i;
      return avatar;
    });
    this.setState({
      defaultAvatarsList: avatars,
      avatar: `default_avatar_${selectedIndex + 1}.svg`,
    });
  }

  addMember = () => {
    const { name, avatar, initials } = this.state;
    const {
      firebase, history, match, team,
    } = this.props;
    if (!name || name.length < 1) {
      this.setState({ errorMessage: 'Please provide member name' });
      return;
    }
    if (!avatar) {
      this.setState({ errorMessage: 'Please pick member avatar' });
      return;
    }
    this.setState({ errorMessage: null });
    firebase.push(`teams/${match.params.teamid}/members`, {
      name,
      avatar,
      initials,
    }).then(() => {
      NotificationManager.success(
        `Member ${name} successfully added to ${team.name}`,
        'Confirmation',
      );
      history.push('/teams');
    });
  }

  render() {
    const { errorMessage } = this.state;
    return (
      <Container>
        <h2 className="form-title">Add Member</h2>
        <Form className="add">
          { errorMessage && <Message color="red">{errorMessage}</Message> }
          <Form.Field className="name">
            <Input onChange={this.setName} size="massive" placeholder="Type member name here..." />
          </Form.Field>
          <Form.Field className="member-avatar">
            <DefaultAvatars onChoose={this.onChooseAvatar} />
          </Form.Field>
          <Form.Field className="initials">
            <Input onChange={this.setInitials} size="massive" placeholder="Type member initials here..." />
          </Form.Field>
          <Button
            onClick={this.addMember}
            floated="right"
            size="medium"
            type="submit"
            secondary
          >
            Add Member
          </Button>
        </Form>
      </Container>
    );
  }
}

AddMember.propTypes = propTypes;

export default AddMember;
