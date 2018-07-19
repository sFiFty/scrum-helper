import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Image, Icon, Button, Input,
} from 'semantic-ui-react';

const propTypes = {
  tasks: PropTypes.array,
  removeTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default class TaskList extends React.Component {
  state = {
    taskTitle: null,
  }

  onSetTaskTitle = event => this.setState({ taskTitle: event.target.value })

  onAddTask = (title) => {
    const { addTask } = this.props;
    addTask(title);
    this.setState({ taskTitle: null });
  }

  render() {
    const { tasks, removeTask, addTask } = this.props;
    const { taskTitle } = this.state;
    return (
      <div>
        {
          tasks
          && (
          <List className="w-50 generated-items-list">
            {
              tasks.map((task, key) => (
                <List.Item key={key} className="d-flex justify-content-start align-items-center">
                  <List.Content className="ml-2 font-s">
                    {task.title}
                  </List.Content>
                  <List.Content className="ml-auto font-s">
                    <Icon
                      className="remove-item-icon"
                      role="button"
                      onClick={() => removeTask(key)}
                      name="trash"
                      color="red"
                    />
                  </List.Content>
                </List.Item>
              ))
            }
          </List>
          )
        }
        <div className="d-flex justify-content-start align-items-center">
          <Input
            onChange={this.onSetTaskTitle.bind(this)}
            value={taskTitle || ''}
            className="w-50"
            size="mini"
            placeholder="Type task title here..."
          />
          {
            taskTitle
            && (
            <Button onClick={() => this.onAddTask(taskTitle)} className="ml-3" size="mini" secondary>
              <span>
Add
              </span>
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}

TaskList.propTypes = propTypes;
