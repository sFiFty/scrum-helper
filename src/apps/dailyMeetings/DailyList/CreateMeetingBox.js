import React, {PureComponent} from 'react'
import {List, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class CreateMeetingBox extends PureComponent {
	render() {
		return (
			<List.Item className="add-team-container">
				<Link to="daily/create" className="text-color">
					<Icon circular size="large" name="add" />
					<span className="font-m pl-2">Add meeting</span>
				</Link>
			</List.Item>
		)
	}
}

