import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

class BoardSelection extends Component {
  state = {
    selectedBoard: null,
  }

  onChooseBoard = (event, data) => {
    const { boards } = this.props;
    const selectedBoard = boards.find(b => b.id === data.value);
    this.setState({ selectedBoard });
  }

  render() {
    const { simpleBoardsList } = this.props;
    const { selectedBoard } = this.state;
    return (
      <div className="board-selection-container">
        <Dropdown
          onChange={this.onChooseBoard}
          placeholder="Select board"
          value={selectedBoard && selectedBoard.Id}
          search
          selection
          options={simpleBoardsList}
        />
      </div>

    );
  }
}

BoardSelection.propTypes = {
  simpleBoardsList: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })).isRequired,
  boards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default BoardSelection;
