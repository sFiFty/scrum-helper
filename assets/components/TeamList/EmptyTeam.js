import React from 'react'
import {Image, Button} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class EmptyTeam extends React.Component {
    render() {
        return (
            <div className="empty-team-container">
                <Image
                    className="empty-team-img"
                    alt="Team is empty"
                    title="Team is empty"
                    src={require('../../img/add-team.png')}
                />
                <div className="empty-team-message text-center">
                    <h3>Add Your First Team</h3>
                    <p className="font-m">You don't have any team yet, press the button to start creating first one!</p>
                    <Button as={Link} to="teams/add" size="big" type="submit" onClick={this.dialogOpen} secondary>Create My First Team</Button>
                </div>
                
            </div>
        )
    }
}