import React from 'react'
import {List, Image, Icon} from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class TaskList extends React.Component {
	render() {
		const {tasks, removeTask} = this.props
		return (
      tasks &&
      <List className="w-50 generated-items-list">
        {
          tasks.map((task, key) => {
            return (
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
                    color="red" />
                </List.Content>
              </List.Item>
            )
          })
        }
      </List>
		)
  }

	static propTypes = {
		tasks: PropTypes.array.isRequired,
		removeTask: PropTypes.func.isRequired
	}
}