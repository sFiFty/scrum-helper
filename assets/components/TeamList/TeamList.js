import React from 'react'
import {Container, Header, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import EmptyTeamList from './EmptyTeamList'
import MemberListInTheTeam from './MemberListInTheTeam'
import './team-list.scss'

export default class TeamList extends React.Component {
    render() {
        const { myTeams } = this.props
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
                                            <MemberListInTheTeam members={myTeams[k].members} teamKey={k} />
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