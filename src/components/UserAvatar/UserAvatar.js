import React, {Component} from 'react'
import {Dropdown, Header, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class UserAvatar extends Component {
	render() {
		const {name, avatar, signOut, uid} = this.props
		const link = "/user/" + uid
		const trigger = avatar ? <Image src={avatar} avatar /> : <Icon size="huge" name='user circle' />
		return (
		<div>
			<Dropdown trigger={trigger}>
				<Dropdown.Menu>
					<Dropdown.Item text="Profile" as={Link} to={link}></Dropdown.Item>
					<Dropdown.Item onClick={() => signOut()} icon='sign out' text='Sign out' />
				</Dropdown.Menu>
			</Dropdown>
		</div>
		)
	}
}