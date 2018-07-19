import React from 'react';
import {
  Container, Header, Input, Form, Button, Message,
} from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import DefaultAvatars from 'Components/DefaultAvatars';
import './styles.scss';

export default class AddMember extends React.Component {
	state = {
	  name: null,
	  errorMessage: null,
	  initials: null,
	  avatar: null,
	}

	selectAvatar = (selectedIndex) => {
	  const { defaultAvatarsList } = this.state;
	  defaultAvatarsList.map((avatar, index) => {
	    avatar.selected = selectedIndex === index;
	  });
	  this.setState({
	    defaultAvatarsList,
	    avatar: `default_avatar_${selectedIndex + 1}.svg`,
	  });
	}

	onChooseAvatar = avatar => this.setState({ avatar })

	setName = event => this.setState({ name: event.target.value })

	setInitials = event => this.setState({ initials: event.target.value })

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
	  }).then((data) => {
	    NotificationManager.success(
	      `Member ${name} successfully added to ${team.name}`,
	      'Confirmation',
	    );
	    history.push('/teams');
	  });
	}

	render() {
	  const { firebase, profile } = this.props;
	  const {
	    errorMessage, defaultAvatarsList, name, avatar,
	  } = this.state;
	  return (
  <Container>
    <h2 className="form-title">
Add Member
    </h2>
    <Form className="add">
      {
						errorMessage
						&& (
<Message color="red">
  {errorMessage}
</Message>
						)
					}
      <Form.Field className="name">
        <Input onChange={this.setName.bind(this)} size="massive" placeholder="Type member name here..." />
      </Form.Field>
      <Form.Field className="member-avatar">
        <DefaultAvatars onChoose={this.onChooseAvatar} />
      </Form.Field>
      <Form.Field className="initials">
        <Input onChange={this.setInitials.bind(this)} size="massive" placeholder="Type member initials here..." />
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

	static propTypes = {
	  firebase: PropTypes.object.isRequired,
	  team: PropTypes.object,
	  profile: PropTypes.object,
	}
}
