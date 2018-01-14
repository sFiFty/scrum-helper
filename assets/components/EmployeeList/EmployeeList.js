import React from 'react'
import PropTypes from 'prop-types'
import SMLoader from '../SMLoader/SMLoader'
import MemberCell from './MemberCell'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import {NotificationManager}  from 'react-notifications'
import {Table, Button} from 'semantic-ui-react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import './employee-list.scss'

export default class EmployeeList extends React.Component {
    static propTypes = {
        team: PropTypes.object,
        firebase: PropTypes.object
    }

    state = {
        open: false,
        deletedEmployeeId: null
    }
    
    handleOpen = employeeId => {
        this.setState({deletedEmployeeId: employeeId})
        this.setState({open: true})
    }
    
    handleClose = () => {
        this.setState({deletedEmployeeId: null})
        this.setState({open: false})
    }

    delete = () => {
        const {firebase, team, profile} = this.props
        firebase.remove(`teams/${profile.teamId}/employees/${this.state.deletedEmployeeId}`)
        this.setState({open: false})
        const employee = team.employees[this.state.deletedEmployeeId]
        NotificationManager.success(
            `Member ${employee.firstName} ${employee.lastName} was successfully removed from your team`, 
            'Success'
        )
    }

    toggleAvailability = index => {
        const {firebase, team, profile} = this.props
        firebase.update(`teams/${profile.teamId}/employees/${index}`, {availability: !team.employees[index].availability})
    }

    render() {
        let i = 0
        const {team, profile, firebase} = this.props
        const employeeList = !isLoaded(team)
            ? 
                <Table.Row>
                    <Table.Cell>
                        <SMLoader />
                    </Table.Cell>
                </Table.Row>
            : team === null || isEmpty(team.employees)
            ? 
                <Table.Row>
                    <Table.Cell className="h3" textAlign='center' colSpan='3'>
                    Currently, the list of members  is empty.
                    </Table.Cell>
                </Table.Row>
            : _.keys(team.employees).map(index => {
                return (
                    <MemberCell 
                        key={index}
                        id={index} 
                        employee={team.employees[index]}
                        toggleAvailability={this.toggleAvailability}
                        handleOpen={this.handleOpen} />
                )
            })
        const actions = [
            <RaisedButton
                label="Cancel"
                primary
                onClick={this.handleClose}
            />,
            <RaisedButton
                label="Delete"
                primary
                keyboardFocused
                onClick={this.delete}
            />,
        ]
        return (
            <Paper zDepth={2} className="employee-list-wrapper row">
                <Dialog
                    title="Team member will be deleted"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Are you sure?
                </Dialog>
                <Table selectable className="employee-list">
                    <TableHeader team={team} firebase={firebase} profile={profile} />
                    <Table.Body>
                        {employeeList}
                    </Table.Body>
                    <TableFooter />
                </Table>
            </Paper>
        )
    }
}
