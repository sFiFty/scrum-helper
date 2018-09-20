import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Button } from 'semantic-ui-react';

import BoardSelection from './components/BoardSelection'
import './styles.scss';

const propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  owner: PropTypes.string.isRequired,
};

class TrelloIntegration extends Component {

  connect = () => {
    Trello.authorize({
      type: 'popup',
      name: 'Scrum Helper',
      scope: {
        read: true,
        write: true,
        account: true,
      },
      expiration: 'never',
      success: (data) => {
        console.log(data)
      }
    });
  }

  getBoards = () => {
    Trello.rest('get', "members/me", (data) => {
      console.log(data)
    })
  }

  render() {
    return (
      <div className="trello-integration-container">
        <Button onClick={this.connect} className="ml-3" size="mini" secondary>
          <span>Connect</span>
        </Button>
        <Button onClick={this.getBoards} className="ml-3" size="mini" secondary>
          <span>Get boards</span>
        </Button>
      </div>
    );
  }
}

TrelloIntegration.propTypes = propTypes;

export default TrelloIntegration;
