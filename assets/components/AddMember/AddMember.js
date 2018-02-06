import React from 'react'
import {Container, Header, Input, Form, Button, Message} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import _ from 'lodash'
import './add-member.scss'

export default class AddMember extends React.Component {
    state = {
        name: null,
        errorMessage: null,
        defaultAvatarsList: []
    }
    componentDidMount() {
        if (this.state.defaultAvatarsList.length === 0) {
            let list = []
            for (let i = 1; i <= 12; i++) {
                list.push({
                    src: require(`../../img/default_avatar_${i}.svg`),
                    selected: false
                })
            }
            this.setState({defaultAvatarsList: list})
        }

    }
    onSelectAvatar = (selectedIndex) => {
        let { defaultAvatarsList } = this.state
        defaultAvatarsList.map((avatar, index) => {
            avatar.selected = selectedIndex === index
        })
        this.setState({defaultAvatarsList: defaultAvatarsList})
    }
    setName = event => this.setState({name: event.target.value})
    onAddTeam = () => {
        const {name} = this.state
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
        const {firebase, profile} = this.props
        const {errorMessage, color, defaultAvatarsList} = this.state

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
                    <Form.Field className="member-avatar">
                        {
                            defaultAvatarsList.map((avatar, index) => {
                                return <div className={avatar.selected ? 'selected' : ''} key={index} onClick={() => this.onSelectAvatar(index)}>
                                    <img src={avatar.src} />
                                </div>
                            })
                        }
                    </Form.Field>
                    <Button onClick={this.onAddTeam} floated="right" size="big" type="submit" secondary>Add Member</Button>
                </Form>
            </Container>
        )
    }
}