import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isLoaded } from 'react-redux-firebase';
import {
  Container, Input, Form, Button, Message, Popup, Image,
} from 'semantic-ui-react';

import SMLoader from 'Components/SMLoader';

const propTypes = {
  owner: PropTypes.string.isRequired,
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

class TeamProfile extends Component {
  onChange = () => {};

  render() {
    const { team } = this.props;
    return (
      isLoaded(team)
        ? (
          <Container>
            <Form className="add" id="add-team">
              <Form.Field className="name">
                <Input value={team.name} onChange={this.setName} size="massive" placeholder="Type team name here..." />
              </Form.Field>
            </Form>
          </Container>
        ) : (
          <Container>
            <SMLoader />
          </Container>
        )
    );
  }
}

TeamProfile.propTypes = propTypes;

export default TeamProfile;
