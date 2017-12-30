import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'semantic-ui-react'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import SMLoader from '../SMLoader/SMLoader'
import './employee-list.scss'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import MemberCell from './MemberCell'
import TableFooter from './TableFooter'
import { NotificationManager }  from 'react-notifications'

export default class EmployeeList extends React.Component {
    static propTypes = {
        employees: PropTypes.object,
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
        const { firebase, employees, profile } = this.props
        firebase.remove(`teams/${profile.teamId}/employees/${this.state.deletedEmployeeId}`)
        this.setState({open: false})
        const employee = employees[this.state.deletedEmployeeId]
        NotificationManager.success(
            `Member ${employee.firstName} ${employee.lastName} was successfully removed from your team`, 
            'Success'
        )
    }

    toggleAvailability = index => {
        const { firebase, employees, profile } = this.props
        firebase.update(`teams/${profile.teamId}/employees/${index}`, { availability: !employees[index].availability })
    }

    render() {
        let i = 0
        const { employees, profile } = this.props
        
        const employeeList = !isLoaded(employees)
            ? 
                <Table.Row>
                    <Table.Cell>
                        <SMLoader />
                    </Table.Cell>
                </Table.Row>
            : isEmpty(employees)
            ? 
            <Table.Row>
                <Table.Cell className="h3" textAlign='center' colSpan='3'>
                    List of members currently is empty
                </Table.Cell>
            </Table.Row>
            : _.keys(employees).map(index => {
                return (
                    <MemberCell 
                        key={index}
                        id={index} 
                        employee={employees[index]}
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
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Availability</Table.HeaderCell>
                            <Table.HeaderCell width={1}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { employeeList }
                    </Table.Body>
                    <TableFooter />
                </Table>
            </Paper>
        )
    }
}
