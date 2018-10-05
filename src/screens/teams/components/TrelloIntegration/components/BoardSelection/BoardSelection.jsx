import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import BoardItem from './components/BoardItem';

class BoardSelection extends Component {
  state = {
    selectedBoard: null,
    boardLists: null,
  }

  onChooseBoard = (event, data) => {
    const { boards } = this.props;
    const selectedBoard = boards.find(b => b.id === data.value);
    window.Trello.rest('get', `boards/${data.value}/lists`, (boardLists) => {
      this.setState({ selectedBoard, boardLists });
    });
  }

  getSimpleList = boards => (
    boards.map(b => ({
      value: b.id,
      key: b.id,
      text: b.name,
    }))
  )

  render() {
    const { selectedBoard, boardLists } = this.state;
    const { boards } = this.props;
    const simpleBoardsList = this.getSimpleList(boards);
    return (
      <div className="board-selection-container mt-3">
        <Dropdown
          onChange={this.onChooseBoard}
          placeholder="Select board"
          value={selectedBoard && selectedBoard.id}
          search
          selection
          options={simpleBoardsList}
        />
        {
          boardLists && (
            <div>
              <div> The list name must match the team member initials! </div>
              <div>Board lists names:</div>
              <ul>
                {
                  boardLists.map(board => <BoardItem {...this.props} key={board.id} item={board} />)
                }
              </ul>
            </div>
          )
        }

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
