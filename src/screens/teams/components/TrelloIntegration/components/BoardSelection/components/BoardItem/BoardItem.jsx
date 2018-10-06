import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

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
    const isConnected = members && members.find(m => m.initials === item.name);
    return (
      <li className="board-item mt-3">
        {item.name}
        {
          isConnected &&
          <Button size="mini" onClick={() => this.fetchCommitments(item)}>
            <i class="fas fa-sync"></i>&nbsp;
            Sync commitments
          </Button>
        }
      </li>
    );
  }
}
