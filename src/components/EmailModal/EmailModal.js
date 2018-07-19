import React from 'react';
import {
  Icon, Button, Modal, Header, Input, Message,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { validateEmail } from 'Helpers/Validators';

export default class EmailModal extends React.Component {
  state = {
    email: null,
    errorMessage: null,
  }

  setEmail = event => this.setState({ email: event.target.value })

  save = () => {
    const { firebase, user } = this.props;
    const { email } = this.state;
    if (!_.trim(email).length || !validateEmail(_.trim(email))) {
      this.setState({ errorMessage: 'Please provide valid email' });
      return false;
    }
    this.setState({ isError: false });
    firebase.updateEmail(email).then(() => {
      user.sendEmailVerification().then(() => {
        firebase.updateProfile({ isVerificationEmailSent: true, email });
        NotificationManager.success(
          'Mail sent successfully!',
          'Confirmation',
        );
      });
    }).catch(e => this.setState({ errorMessage: e.message }));
  }

  render() {
    const { isModalOpen, close } = this.props;
    const { errorMessage } = this.state;
    return (
      <Modal size="mini" open={isModalOpen} onClose={close}>
        <Header icon="mail" content="Change Email Address" />
        <Modal.Content>
          {
              errorMessage
                ? (
                  <Message color="red">
                    {errorMessage}
                  </Message>
                )
                : ''
            }
          <Input onChange={this.setEmail} fluid placeholder="Type email here..." />
          <Button onClick={this.save} className="mt-3" fluid secondary>
Save
          </Button>
        </Modal.Content>
      </Modal>
    );
  }

	static propTypes = {
	  firebase: PropTypes.object.isRequired,
	  close: PropTypes.func.isRequired,
	  isModalOpen: PropTypes.bool.isRequired,
	}
}
