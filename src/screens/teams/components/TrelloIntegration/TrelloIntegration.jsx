import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import BoardSelection from './components/BoardSelection';
import './styles.scss';

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
    });
  }

  connect = () => {
    window.Trello.authorize({
      type: 'popup',
      name: 'Scrum Helper',
      scope: {
        read: true,
        write: true,
        account: true,
      },
      expiration: 'never',
    });
  }

  render() {
    const { boards } = this.state;
    return (
      <div className="trello-integration-container">
        <Button onClick={this.connect} className="ml-3" size="mini" secondary>
          <span>Connect</span>
        </Button>
        <Button onClick={this.getBoards} className="ml-3" size="mini" secondary>
          <span>Get boards</span>
        </Button>
        {
          boards &&
          <BoardSelection boards={boards} />
        }
      </div>
    );
  }
}

TrelloIntegration.propTypes = propTypes;

export default TrelloIntegration;
