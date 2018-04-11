import React from 'react'
import {Container} from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class EmailConfirmation extends React.Component {
	render() {
		return (
			<Container> 
        Estimations
			</Container>
		)
  }

	static propTypes = {
		firebase: PropTypes.object.isRequired
	}
}

