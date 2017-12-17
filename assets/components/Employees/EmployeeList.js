import React from 'react'
import {List, ListItem} from 'material-ui/List'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './employee-list.scss'
import Toggle from 'material-ui/Toggle'
import firebase from '../../firebase/db'

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
    toggleAvailability = employeeId => {
        const { employees } = this.props
        firebase.database().ref('employees/' + employeeId).set({
            firstName: employees[employeeId].firstName,
            lastName: employees[employeeId].lastName,
            availability: !employees[employeeId].availability
        })
    }
    render() {  
        const { employees } = this.props
        let i = 0
        return (
            <Paper zDepth={2} className="employee-list-wrapper">
                <List className="employee-list">
                    <ReactCSSTransitionGroup
                        transitionName="shuffle"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                            {
                                _.keys(employees).map(index => {
                                    i++
                                    let fullName = i + '. ' + employees[index].firstName + ' ' + employees[index].lastName
                                    return (
                                        <ListItem
                                            key={i}
                                            primaryText={fullName}
                                            secondaryText={this.props.withToggle ? <Toggle defaultToggled={employees[index].availability} onToggle={() => this.toggleAvailability(index)} style={styles.toggle} /> : ''}
                                        />
                                    )
                                })
                            }
                    </ReactCSSTransitionGroup>
                </List>
            </Paper>
        )
    }
}