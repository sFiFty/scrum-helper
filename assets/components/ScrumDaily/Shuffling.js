import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import SMLoader from '../SMLoader/SMLoader'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'

export default class Shuffling extends React.Component {
    state = {
        employees: null
    }
    componentWillMount() {
        const { employees } = this.props
        this.setState({ employees: this.shuffle(employees) })
    }
    shuffle = employees => {
        let keys = Object.keys(employees),
            newEmployees = []
        keys.map((k, i) => { 
            let fullName = employees[i].firstName + ' ' + employees[i].lastName
            newEmployees.push(fullName);
        })
        return newEmployees.sort(() => .5 - Math.random())
    }
    render() {
        const { employees } = this.state
        const { goToNextStep } = this.props
        if (!employees) return <SMLoader />
        const employeeList = isEmpty(employees)
        ? 'Employee list is empty'
        : employees.map((employee, index) => {
            let listLine = index + 1 + '. ' + employee
            return (
                <ListItem 
                    key={index}
                    primaryText={listLine} 
                />
            )
        })
        return (
            <div>
                <div className="white-background"></div>
                <div className="shuffling-layout">
                    <Paper zDepth={2} className="employee-list-wrapper">
                        <List className="employee-list">
                            { employeeList }
                        </List>
                        <RaisedButton 
                            className="shuffling-button" 
                            primary 
                            onClick={() => { goToNextStep() }}
                            label="Finish" />
                    </Paper>
                </div>
            </div>
        )
    }

}