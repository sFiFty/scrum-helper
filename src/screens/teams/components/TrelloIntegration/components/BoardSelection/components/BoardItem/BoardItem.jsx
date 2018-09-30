import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BoardItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
      const { item } = this.props;
    return (
      <li className="board-item">
        {item.name}
      </li>
    )
  }
}
