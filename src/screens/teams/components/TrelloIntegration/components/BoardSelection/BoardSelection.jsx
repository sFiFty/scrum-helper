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
    console.log(selectedBoard)
    this.setState({ selectedBoard });
  }

  getSimpleList = boards => (
    boards.map(b => ({
      ...b,
      value: b.id,
      key: b.id,
      text: b.name,
    }))
  )

  render() {
    const { selectedBoard } = this.state;
    const { boards } = this.props;
    const simpleBoardsList = this.getSimpleList(boards);
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
  boards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default BoardSelection;
