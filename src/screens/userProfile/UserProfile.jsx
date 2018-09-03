import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Image, Button, List, Modal,
} from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import { isLoaded } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';

import SMLoader from 'Components/SMLoader';
import InlineEditable from 'Components/InlineEditable';
import './styles.scss';


const propTypes = {
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  }),
  firebase: PropTypes.shape({
    uploadFiles: PropTypes.func,
    updateProfile: PropTypes.func,
    auth: PropTypes.func,
  }).isRequired,
};

const defaultProps = {
  profile: null,
};

class UserProfile extends React.Component {
  state = {
    isModalOpened: false,
  }

  onFileAdded = (files) => {
    const { firebase } = this.props;
    return firebase.uploadFiles('test', files, 'test').then((data) => {
      firebase.updateProfile({ avatar: data[0].File.downloadURL });
    });
  }

  setName = (name) => {
    const { firebase } = this.props;
    firebase.updateProfile({ name });
  }

  deleteProfile = () => {
    const { firebase } = this.props;
    const user = firebase.auth().currentUser;
    user.delete().then(() => {
      NotificationManager.success(
        'Your account was successfully deleted',
        'Confirmation',
      );
    }).catch(() => {
      NotificationManager.error(
        'Something went wrong, please contact us',
        'Error',
      );
    });
  }

  modalShow = () => this.setState({ isModalOpened: true })

  modalClose = () => this.setState({ isModalOpened: false })

  render() {
    const { profile } = this.props;
    const { isModalOpened } = this.state;
    let dropzoneRef;
    return (
      !isLoaded(profile)
        ? <SMLoader />
        : (
          <Container>
            <div className="d-flex flex-row profile-container justify-content-center align-items-center">
              <div className="image-container d-flex flex-column align-items-center justify-content-center">
                <Dropzone
                  style={{ borderWidth: 0 }}
                  ref={node => dropzoneRef = node}
                  onDrop={this.onFileAdded}
                >
                  <Image src={profile.avatar} />
                </Dropzone>
                <Button onClick={() => { dropzoneRef.open(); }} className="mt-3 w-100" basic size="tiny">
                  Change Avatar
                </Button>
                <Button onClick={this.modalShow} className="mt-3 w-100" color="red" size="tiny">
                  Delete Profile
                </Button>
              </div>
              <div className="profile-information-container">
                <List divided verticalAlign="middle">
                  <List.Item>
                    <InlineEditable onChange={this.setName} text={profile.name} placeholder="Type your name here..." />
                  </List.Item>
                </List>
              </div>
            </div>
            <Modal size="tiny" open={isModalOpened} onClose={this.modalClose}>
              <Modal.Header>Delete Your Account</Modal.Header>
              <Modal.Content><p>Are you sure you want to delete your account</p></Modal.Content>
              <Modal.Actions>
                <Button negative onClick={this.modalClose}>No</Button>
                <Button positive onClick={this.deleteProfile} icon="checkmark" labelPosition="right" content="Yes" />
              </Modal.Actions>
            </Modal>
          </Container>
        )
    );
  }
}

UserProfile.propTypes = propTypes;
UserProfile.defaultProps = defaultProps;

export default UserProfile;
