import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import BoardItem from './components/BoardItem';
import './styles.scss';

const propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  onSetBoard: PropTypes.func.isRequired,
};

class BoardSelection extends Component {
  state = {
    selectedBoard: null,
    boardLists: null,
  }

  onChooseBoard = (event, data) => {
    const { boards, onSetBoard } = this.props;
    const selectedBoard = boards.find(b => b.id === data.value);
    window.Trello.rest('get', `boards/${data.value}/lists`, (boardLists) => {
      window.Trello.rest('get', `boards/${data.value}/labels`, (labels) => {
        onSetBoard({ ...selectedBoard, labels });
        this.setState({ selectedBoard, boardLists });
      });
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
            <div className="board-list-container">
              <div className="mt-2">
                <i className="fas fa-exclamation-circle" />&nbsp;
                The list name must match the team member initials!
              </div>
              <h3 className="mt-3">Board lists names:</h3>
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

BoardSelection.propTypes = propTypes;

export default BoardSelection;
