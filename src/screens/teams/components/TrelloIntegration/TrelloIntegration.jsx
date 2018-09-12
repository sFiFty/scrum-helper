import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Button } from 'semantic-ui-react';

import './styles.scss';

// const propTypes = {
//   prop: PropTypes
// }

class TrelloIntegration extends Component {
  state = {
    trelloKey: null,
  }

  onSetTrelloKey = value => this.setState({ trelloKey: value });

  render() {
    const { trelloKey } = this.state;
    return (
      <div className="trello-integration-container">
        <Form.Field className="d-flex align-items-center trello-key">
          <Input onChange={this.onSetTrelloKey} size="massive" placeholder="Type your trello key here..." />
          {
            trelloKey
            && (
              <Button onClick={this.addMember} className="ml-3" size="mini" secondary>
                <span>Get boards</span>
              </Button>
            )
          }
        </Form.Field>
      </div>
    );
  }
}

export default TrelloIntegration;

// TrelloIntegration.propTypes = propTypes;
