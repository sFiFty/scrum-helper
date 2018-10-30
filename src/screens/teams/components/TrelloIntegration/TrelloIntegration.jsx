import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import BoardSelection from './components/BoardSelection';

const propTypes = {
  firebase: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  team: PropTypes.shape({
    board: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  owner: PropTypes.string.isRequired,
};

const defaultProps = {
  team: null,
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
    const { team } = this.props;
    return (
      <div className="trello-integration-container">
        {
          team && team.board ? (
            <React.Fragment>
              <div>Selected board: {team.board.name}</div>
              <Button onClick={this.getBoards} className="mt-3" size="mini" secondary>
                <span>Change board</span>
              </Button>
            </React.Fragment>
          ) : (
            <Button onClick={this.getBoards} className="mt-3" size="mini" secondary>
              <span>Get boards</span>
            </Button>
          )
        }
        {
          boards && <BoardSelection boards={boards} {...this.props} />
        }
      </div>
    );
  }
}

TrelloIntegration.propTypes = propTypes;
TrelloIntegration.defaultProps = defaultProps;

export default TrelloIntegration;
