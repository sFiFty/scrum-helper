import React, { Component } from 'react'
import PropTypes from 'prop-types'

// const propTypes = {
//   prop: PropTypes
// }

class TrelloIntegration extends Component {
  onSetTrelloKey = value => this.setState({ trelloKey: value });
  render() {
    return (
      <div>
        <Form.Field className="trello-key">
          <Input onChange={this.setTrelloKey} size="massive" placeholder="Type your trello key here..." />
        </Form.Field>
      </div>
    )
  }
}

export default TrelloIntegration;

// TrelloIntegration.propTypes = propTypes;
