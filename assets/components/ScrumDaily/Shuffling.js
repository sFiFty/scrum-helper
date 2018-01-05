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
    componentDidMount() {
        const interval = setInterval(() => {
            if (isLoaded(this.props.employees)) {
                clearInterval(interval)
                this.setParams(this.props.employees)
            }
        }, 100)
        
    }
    setParams = employees => {
        const filteredEmployeeList = _.filter(employees, {availability: true})
        this.setState({employees: this.shuffle(filteredEmployeeList)})
    }
    render() {
        const { employees, timer } = this.state
        if (!employees) return <SMLoader />
        const employeeList = isEmpty(employees)
        ? 'Employee list is empty'
        : _.keys(employees).map((index, position) => {
            let fullName = position + 1 + '. ' + employees[index].firstName + ' ' + employees[index].lastName
            return (
                <ListItem 
                    primaryText={fullName} 
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
                            containerElement={<Link to="/daily/finishing" />} 
                            label="Finish" />
                    </Paper>
                </div>
            </div>
        )
    }

}