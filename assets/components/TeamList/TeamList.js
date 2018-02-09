import React from 'react'
import {Container, Header, List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import EmptyTeamList from './EmptyTeamList'
import MemberListInTheTeamContainer from '../../containers/MemberListInTheTeamContainer'
import AddTeamBox from './AddTeamBox'
import SMLoader from '../SMLoader/SMLoader'
import './team-list.scss'

export default class TeamList extends React.Component {
    render() {
        const { teams, uid } = this.props
        console.log(teams)
        return (
            <Container className="team-list-container">
                <Header as='h2'>My Teams</Header>
                {
                    isLoaded(teams) ?
                        <List className="team-list">
                            {
                                _.keys(teams).map(k => {
                                    if (teams[k].owner !== uid) return
                                    return (
                                        <List.Item className="team-item text-color" key={k}>
                                            <div className="color-filler" style={{backgroundColor: teams[k].color}}></div>
                                            <List.Content>
                                                <List.Header>{teams[k].name}</List.Header>
                                                <MemberListInTheTeamContainer teamid={k} />
                                            </List.Content>
                                        </List.Item>
                                    )
                                })
                            }
                            <AddTeamBox />
                        </List> :
                        <SMLoader />
                }
            </Container>
        )
    }
}