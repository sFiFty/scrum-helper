import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import SMLoader from '../SMLoader/SMLoader'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'

export default class Shuffling extends React.Component {
    render() {
        const { employees } = this.props
        let i = 0
        const employeeList = !isLoaded(employees)
        ? <SMLoader />
        : isEmpty(employees)
        ? 'Employee list is empty'
        : _.keys(this.shuffle(employees)).map(index => {
            i++
            let fullName = i + '. ' + employees[index].firstName + ' ' + employees[index].lastName
            return (
                <ListItem key={i} primaryText={fullName} />
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
                            containerElement={<Link to="/daily/finishing" />} 
                            label="Finish" />
                    </Paper>
                </div>
            </div>

        )
    }
    shuffle = employees => {
        let keys = Object.keys(employees),
            newEmployees = {}
        keys.sort((a,b) => Math.random() - 0.5)
        keys.map(k => { newEmployees[k] = employees[k]})
        return newEmployees
    }
}