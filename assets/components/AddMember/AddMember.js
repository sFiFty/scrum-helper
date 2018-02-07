import React from 'react'
import {Container, Header, Input, Form, Button, Message} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import _ from 'lodash'
import './add-member.scss'

export default class AddMember extends React.Component {
    state = {
        name: null,
        errorMessage: null,
        defaultAvatarsList: [],
        avatar: null
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

    selectAvatar = (selectedIndex) => {
        let { defaultAvatarsList } = this.state
        defaultAvatarsList.map((avatar, index) => {
            avatar.selected = selectedIndex === index
        })
        this.setState({
            defaultAvatarsList: defaultAvatarsList, 
            avatar: `default_avatar_${selectedIndex + 1}.svg`
        })
    }

    setName = event => this.setState({name: event.target.value})

    addMember = () => {
        const {name, avatar} = this.state
        const {firebase, history, match} = this.props
        if (!name || name.length < 1) {
            this.setState({errorMessage: 'Please provide member name'})
            return
        } 
        this.setState({errorMessage: null})
        firebase.push(`teams/${match.params.teamid}/members`, {
            name: name,
            avatar: avatar
        }).then(team => {
            NotificationManager.success(
                `Member ${name} successfully added to your team`, 
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
                                return <div className={avatar.selected ? 'selected' : ''} key={index} onClick={() => this.selectAvatar(index)}>
                                    <img src={avatar.src} />
                                </div>
                            })
                        }
                    </Form.Field>
                    <Button onClick={this.addMember} floated="right" size="big" type="submit" secondary>Add Member</Button>
                </Form>
            </Container>
        )
    }
}