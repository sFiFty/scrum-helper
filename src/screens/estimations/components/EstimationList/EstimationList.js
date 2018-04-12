import React from 'react'
import {Container, List} from 'semantic-ui-react'
import AddListItemBox from 'Components/AddListItemBox'
import PropTypes from 'prop-types'

export default class EmailConfirmation extends React.Component {
	render() {
		return (
			<Container> 
        <List>
          <List.Item className="text-color item-container">
          </List.Item>
          <AddListItemBox link="estimation/create" label="Add estimation meeting" />
        </List> 
			</Container>
		)
  }

	static propTypes = {
		firebase: PropTypes.object.isRequired
	}
}

