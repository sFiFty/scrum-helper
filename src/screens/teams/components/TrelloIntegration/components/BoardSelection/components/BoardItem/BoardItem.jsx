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
    onSetTrelloCommitments: PropTypes.func.isRequired,
  }

  static defaultProps = {
    members: null,
  }

  fetchCommitments = (item, member) => {
    window.Trello.rest('get', `lists/${item.id}/cards`, cards => (
      this.props.onSetTrelloCommitments(cards, member)
    ));
  }

  render() {
    const { item, members } = this.props;
    const member = members && members.find(m => m.initials === item.name);
    return (
      <li className="board-item mt-3">
        {item.name}
        {
          member &&
          <Button size="mini" onClick={() => this.fetchCommitments(item, member)}>
            <i className="fas fa-sync"></i>&nbsp;
            Sync commitments
          </Button>
        }
      </li>
    );
  }
}
