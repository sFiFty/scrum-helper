import React from 'react'
import {Container, Header, List, Icon, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import EmptyTeamList from './EmptyTeamList'
import MemberListInTheTeamContainer from '../../containers/MemberListInTheTeamContainer'
import './team-list.scss'

export default class TeamList extends React.Component {
    render() {
        const { myTeams, firebase } = this.props
        return (
            <Container className="team-list-container">
                <Header as='h2'>My Teams</Header>
                {
                    myTeams ? 
                    <List className="team-list">
                        {
                            _.keys(myTeams).map(k => {
                                return (
                                    <List.Item className="team-item text-color" key={k}>
                                        <div className="color-filler" style={{backgroundColor: myTeams[k].color}}></div>
                                        <List.Content>
                                            <List.Header>{myTeams[k].name}</List.Header>
                                            <MemberListInTheTeamContainer teamid={k} teams={myTeams} />
                                        </List.Content>
                                    </List.Item>
                                )
                            })
                        }
                        <List.Item className="add-team-container">
                            <Link to="teams/add">
                                <Grid className="text-color" verticalAlign="middle" centered columns={2}>
                                    <Grid.Column width={5}>
                                        <Icon circular size="large" name="add" />
                                    </Grid.Column>
                                    <Grid.Column width={11}>
                                        <span className="font-m ">Add team</span>
                                    </Grid.Column>
                                </Grid>
                            </Link>
                        </List.Item>
                    </List> 
                    :
                    <EmptyTeamList />
                }
            </Container>
        )
    }
}