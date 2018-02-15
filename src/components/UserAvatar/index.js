import React from 'react'
import {Dropdown, Header, Icon, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class UserAvatar extends React.Component {
	render() {
		const {name, avatar, signOut, uid} = this.props
		const link = "/user/" + uid
		return (
		<Header as='h4'>
			<div>
				{
					avatar ? <Image src={avatar} avatar />
					: <Icon size="huge" name='user circle' />
				}
				
				<Header.Content>
					<Dropdown>
						<Dropdown.Menu>
							<Dropdown.Item text="Profile" as={Link} to={link}></Dropdown.Item>
							<Dropdown.Item onClick={() => signOut()} icon='sign out' text='Sign out' />
						</Dropdown.Menu>
					</Dropdown>
				</Header.Content>
			</div>
		</Header>
		)
	}
}