import React from 'react'
import { Container, Header, List } from 'semantic-ui-react'
import EmptyTeam from './EmptyTeam'
import './team-list.scss'

export default class TeamList extends React.Component {
    render() {
        const {profile} = this.props

        return (
            <Container className="team-list-container">
                <Header as='h2'>My Teams</Header>
                {
                    profile.teams ? 
                    <List className="team-list">
                        {
                            _.keys(profile.teams).map(k => {
                                return (
                                    <List.Item className="team-item text-color" key={k}>
                                        <div className="color-filler" style={{backgroundColor: profile.teams[k].color}}></div>
                                        <List.Content>
                                            <List.Header>{profile.teams[k].name}</List.Header>
                                        </List.Content>
                                    </List.Item>
                                )
                            })
                        }
                    </List> 
                    :
                    <EmptyTeam />
                }
            </Container>
        )
    }
}