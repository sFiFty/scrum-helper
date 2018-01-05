import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { isLoaded } from 'react-redux-firebase'
import TextField from 'material-ui/TextField'
import Badge from 'material-ui/Badge'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'


export default class TableHeader extends React.Component {
    static propTypes = {
        team: PropTypes.object,
        firebase: PropTypes.object
    }
    state = {
        teamName: '',
        value: '',
        isEditing: false
    }
    componentDidMount() {
        const interval = setInterval(() => {
            if (isLoaded(this.props.team)) {
                clearInterval(interval)
                this.setState({ 
                    teamName: this.props.team.name || '',
                    value: this.props.team.name || ''
                })
            }
        }, 100)
    }
    handleChange = (name, value) => {
        this.setState({ value: value })
    }
    enableEditing = () => {
        this.setState({ isEditing: true })
    }
    disbleEditing = () => {
        this.setState({ value: this.state.teamName })
        this.setState({ isEditing: false })
    }
    render() {
        const { teamName, isEditing } = this.state
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='3' className="team-name-row h3">
                    {
                        isEditing ?
                        <div>
                            <TextField
                                id="team-name"
                                hintText="Team name"
                                value={this.state.teamName}
                                onChange={this.handleChange}
                            />
                            <FlatButton label="Save" />
                            <FlatButton onClick={this.disbleEditing} label="Cancel" /> 
                        </div>
                        :
                        <Badge
                            badgeContent={<Icon color="black" onClick={this.enableEditing} size="large" name='edit' />}>
                            { teamName || 'Please select team name'}
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