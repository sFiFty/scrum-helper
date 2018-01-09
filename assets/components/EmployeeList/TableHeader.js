import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { isLoaded } from 'react-redux-firebase'
import TextField from 'material-ui/TextField'
import Badge from 'material-ui/Badge'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import { NotificationManager }  from 'react-notifications'

const inputStyles = {
    fontSize: '1.75rem'
}

export default class TableHeader extends React.Component {
    static propTypes = {
        team: PropTypes.object,
        firebase: PropTypes.object
    }
    state = {
        name: '',
        value: '',
        isEditing: false
    }
    componentDidMount() {
        const interval = setInterval(() => {
            if (isLoaded(this.props.team)) {
                clearInterval(interval)
                this.setState({ 
                    name: this.props.team.name || '',
                    value: this.props.team.name || ''
                })
            }
        }, 100)
    }
    setName = event => {
        this.setState({name: event.target.value})
    }
    enableEditing = () => {
        this.setState({ isEditing: true })
    }
    disbleEditing = () => {
        this.setState({ value: this.state.name })
        this.setState({ isEditing: false })
    }
    saveName = () => {
        const { name } = this.state
        const { firebase, profile } = this.props
        firebase.update(`teams/${profile.teamId}`, { name: name }).then(() => {
            NotificationManager.success(
                `The name of your team was successfully updated`, 
                'Success'
            )
            this.setState({ isEditing: false })
        })
    }
    render() {
        const { name, isEditing } = this.state
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='3' className="name-row h3">
                        {
                            isEditing ?
                            <div className="name-editing-container">
                                <TextField
                                    id="name"
                                    hintText="Team name"
                                    value={name}
                                    onChange={this.setName.bind(this)}
                                    style={inputStyles}
                                />
                                <FlatButton onClick={this.saveName} label="Save" />
                                <FlatButton onClick={this.disbleEditing} label="Cancel" /> 
                            </div>
                            :
                            <Badge
                                className="badge-container"
                                badgeContent={<Icon color="black" 
                                onClick={this.enableEditing} 
                                size="large" 
                                name='edit' />}>
                                { name || 'Please select team name'}
                            </Badge> 
                        }
                    </Table.HeaderCell>
                </Table.Row> 
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell width={3}>Availability</Table.HeaderCell>
                    <Table.HeaderCell width={1}></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }
}