import React from 'react'
import {Container, Header, List, Image, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import EmptyTeamList from './EmptyTeamList'
import './team-list.scss'

export default class TeamList extends React.Component {
    render() {
        const { myTeams } = this.props
        console.log(this.props)
        return (
            <Container className="team-list-container">
                <Header as='h2'>My Teams</Header>
                {
                    myTeams ? 
                    <List className="team-list" animated>
                        {
                            _.keys(myTeams).map(k => {
                                return (
                                    <List.Item className="team-item text-color" key={k}>
                                        <div className="color-filler" style={{backgroundColor: myTeams[k].color}}></div>
                                        <List.Content>
                                            <List.Header>{myTeams[k].name}</List.Header>
                                            {  
                                                myTeams[k].members ?
                                                list :
                                                <div className="member-list">
                                                    <Image src={require('../../img/avatar_hipster.png')} avatar />
                                                    <Image src={require('../../img/avatar_hipster.png')} avatar />
                                                    <Image src={require('../../img/avatar_hipster.png')} avatar />
                                                    <Image src={require('../../img/avatar_hipster.png')} avatar />
                                                    <Link to="/members/add" className="icon-border">
                                                        <Icon size="large" name="add" />
                                                    </Link>
                                                </div>
                                            }
                                        </List.Content>
                                    </List.Item>
                                )
                            })
                        }
                    </List> 
                    :
                    <EmptyTeamList />
                }
            </Container>
        )
    }
}