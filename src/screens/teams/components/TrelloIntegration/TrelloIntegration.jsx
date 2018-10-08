import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import BoardSelection from './components/BoardSelection';

const propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  owner: PropTypes.string.isRequired,
};

class TrelloIntegration extends Component {
  state = {
    boards: null,
  }

  getBoards = () => {
    window.Trello.rest('get', 'members/me', (member) => {
      window.Trello.rest('get', `members/${member.id}/boards`, boards => (
        this.setState({ boards })
      ));
    }, () => {
      this.connect(() => this.getBoards(), () => {
        NotificationManager.error(
          'Something went wrong, please contact administrators',
          'Error',
        );
      });
    });
  }

  connect = (success, error) => {
    window.Trello.authorize({
      type: 'popup',
      name: 'Scrum Helper',
      scope: {
        read: true,
        write: true,
        account: true,
      },
      success,
      error,
      expiration: 'never',
    });
  }

  render() {
    const { boards } = this.state;
    return (
      <div className="trello-integration-container">
        <Button onClick={this.getBoards} className="mt-3" size="mini" secondary>
          <span>Get boards</span>
        </Button>
        {
          boards && <BoardSelection boards={boards} {...this.props} />
        }
      </div>
    );
  }
}

TrelloIntegration.propTypes = propTypes;

export default TrelloIntegration;
