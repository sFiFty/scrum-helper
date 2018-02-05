import React from 'react'
import {Container, Header, Input, Form, Button, Message} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import _ from 'lodash'
import './add-member.scss'

export default class AddMember extends React.Component {
    state = {
        name: null,
        color: {
            hex: '#fff'
        },
        errorMessage: null,
    }

    onPickColor = (color, event) => this.setState({color: color.hex})
    setName = event => this.setState({name: event.target.value})
    onAddTeam = () => {
        const {name, color} = this.state
        const {firebase, history, profile} = this.props
        if (!name || name.length < 1) {
            this.setState({errorMessage: 'Please provide team name'})
            return
        } 
        this.setState({errorMessage: null})
        firebase.push('teams/', {
            name: name,
            color: color
        }).then(team => {
            profile.teams[name] = {
                id: team.key
            }
            firebase.updateProfile({
                teams: profile.teams
            })
            NotificationManager.success(
                `Team ${name} successfully created`, 
                'Confirmation'
            )
            history.push('/teams')
        })
    }
    render() {
        const { history, firebase, users, profile } = this.props
        const {errorMessage, color} = this.state
         return (
            <Container>
                <Header as='h2'>Add Member</Header>
                <Form className="add-member-form">
                    {
                        errorMessage ?
                        <Message color='red'>{errorMessage}</Message>
                        : ''
                    }
                    <Form.Field className="member-name">
                        <Input onChange={this.setName.bind(this)} size='massive' placeholder='Type member name here...' />
                    </Form.Field>
                    <Button onClick={this.onAddTeam} floated="right" size="big" type="submit" secondary>Add Member</Button>
                </Form>
            </Container>
        )
    }
}