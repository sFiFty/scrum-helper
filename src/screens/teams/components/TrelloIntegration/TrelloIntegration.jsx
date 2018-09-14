import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Button } from 'semantic-ui-react';

import BoardSelection from './components/BoardSelection'
import './styles.scss';

// const propTypes = {
//   prop: PropTypes
// }

class TrelloIntegration extends Component {
  state = {
    key: null,
    token: null,
    boards: null,
    selectedBoard: null,
    simpleBoardsList: null,
  }

  onSetKey = (event, element) => this.setState({ key: element.value });

  onSetToken = (event, element) => this.setState({ token: element.value });

  connect = () => {
    const { key, token } = this.state;
    const url = `https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`;
    return fetch(url).then(response => response.json()).then((data) => {
      const simpleBoardsList = data.map(board => (
        {
          text: board.name,
          value: board.id,
          key: board.id,
        }
      ));
      this.setState({ boards: data, simpleBoardsList });
    });
  }

  render() {
    const { key, token, simpleBoardsList } = this.state;
    return (
      <div className="trello-integration-container">
        <Form.Field className="d-flex align-items-center trello-key">
          <Input onChange={this.onSetKey} size="massive" placeholder="Type your trello key here..." />
          <Input onChange={this.onSetToken} size="massive" placeholder="Type your trello token here..." />
          {
            key && token && (
              <Button onClick={this.connect} className="ml-3" size="mini" secondary>
                <span>Get boards</span>
              </Button>
            )
          }
        </Form.Field>
        {
          simpleBoardsList && <BoardSelection {...this.state} />
        }
      </div>
    );
  }
}

export default TrelloIntegration;

// TrelloIntegration.propTypes = propTypes;
