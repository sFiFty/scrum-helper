import React from 'react'
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import SMLoader from '../SMLoader/SMLoader'
import './employee-list.scss'

const styles = {
    toggle: {
        marginBottom: 16,
        width: 100,
        marginTop: -20,
        height: 25,
        float: 'right'
    },
}

export default class EmployeeList extends React.Component {
    static propTypes = {
        employees: PropTypes.object,
        firebase: PropTypes.object
    }
    toggleAvailability = index => {
        const { firebase, employees } = this.props
        firebase.update(`employees/${index}`, { availability: !employees[index].availability })
    }
    render() {
        let i = 0
        const { employees } = this.props
        const employeeList = !isLoaded(employees)
            ? <SMLoader />
            : isEmpty(employees)
            ? 'Employee list is empty'
            : _.keys(employees).map(index => {
                i++
                let fullName = i + '. ' + employees[index].firstName + ' ' + employees[index].lastName
                return (
                    <ListItem
                        key={i}
                        primaryText={fullName}
                        secondaryText={
                            <Toggle defaultToggled={employees[index].availability} onToggle={() => this.toggleAvailability(index)} style={styles.toggle} />
                        }
                    />
                )
            })
        return (
            <Paper zDepth={2} className="employee-list-wrapper row">
                <List className="employee-list">
                    { employeeList }
                </List>
            </Paper>
        )
    }
}
