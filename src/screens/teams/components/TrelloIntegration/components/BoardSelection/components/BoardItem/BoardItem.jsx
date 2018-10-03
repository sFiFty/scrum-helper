import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

export default class BoardItem extends Component  {
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    members: PropTypes.arrayOf(PropTypes.shape({
      initials: PropTypes.string,
    })),
  }

  static defaultProps = {
    members: null,
  }

  fetchCommitments = (item) => {
    window.Trello.rest('get', `lists/${item.id}/cards`, cards => (
      console.log(cards)
    ));
  }

  render() {
    const { item, members } = this.props;
    console.log(item)
    console.log(members)
    const isConnected = members && members.find(m => m.initials === item.name);
    return (
      <li className="board-item">
        {item.name}
        {
          isConnected &&
          <Button onClick={() => this.fetchCommitments(item)}>Fetch commitments</Button>
        }
      </li>
    );
  }
}
