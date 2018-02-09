import React from 'react'
import {List, Grid, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class AddTeamBox extends React.Component {
    render() {
        return (
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
        )
    }
}

