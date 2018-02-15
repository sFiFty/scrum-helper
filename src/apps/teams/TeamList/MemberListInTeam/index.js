import React from 'react'
import {Image, Icon, Popup, Header, Grid} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'

export default class MemberListInTeam extends React.Component {
	render() {
		const {members, deleteMember, teamid} = this.props
		return (
			<div className="member-list">
				{  
					members ?
					<div>
						{
							_.keys(members).map(k => {
								return <Popup
									key={k}
									trigger={<Image src={require(`Images/${members[k].avatar}`)} avatar />}
									flowing
									hoverable
								>
									<Grid className="member-popup-details" verticalAlign="middle" centered columns={3}>
										<Grid.Column textAlign='center'>
											<Image src={require(`Images/${members[k].avatar}`)} />
										</Grid.Column>
										<Grid.Column textAlign='center'>
											<Header as='h4'>{members[k].name}</Header>
										</Grid.Column>
										<Grid.Column textAlign='center'>
											<Icon onClick={() => deleteMember({...members[k], id: k}, teamid)} size="large" name="remove" color="red" />
										</Grid.Column>
									</Grid>
								</Popup>
							})
						}
					</div>
					:
					''
				}
			</div>
		)
	}
}

