import React from 'react'
import {Image, Icon, Popup, Header, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class MemberListInTheTeam extends React.Component {
    render() {
        const { members, teamKey } = this.props
        return (
            <div className="member-list">
                {  
                    members ?
                    <div>
                        {
                            _.keys(members).map(k => {
                                return <Popup
                                    key={k}
                                    trigger={<Image src={require(`../../img/${members[k].avatar}`)} avatar />}
                                    flowing
                                    hoverable
                                >
                                    <Grid className="member-popup-details" verticalAlign="middle" centered columns={3}>
                                        <Grid.Column textAlign='center'>
                                            <Image src={require(`../../img/${members[k].avatar}`)} />
                                        </Grid.Column>
                                        <Grid.Column textAlign='center'>
                                            <Header as='h4'>{members[k].name}</Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign='center'>
                                            <Icon size="large" name="remove" color="red" />
                                        </Grid.Column>
                                    </Grid>
                                </Popup>
                            })
                        }
                    </div>
                    :
                    ''
                    
                }
                <Link to={`/teams/${teamKey}/addMember`} className="icon-border">
                    <Icon size="large" name="add" />
                </Link>
            </div>
        )
    }
}

