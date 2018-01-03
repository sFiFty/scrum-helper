import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import SMLoader from '../SMLoader/SMLoader'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import {List, ListItem} from 'material-ui/List'
import Paper from 'material-ui/Paper'
import ReactCountdownClock from 'react-countdown-clock'

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
        let timer = 15*60/_.keys(filteredEmployeeList).length
        this.setState({employees: this.shuffle(employees), timer: timer})
    }

    startTimer = index => {
        const { employees } = this.state
        let employeeList = _.clone(employees)
        _.keys(employeeList).map(i => {
            employeeList[i].timerPaused = true
        })
        employeeList[index].timerPaused = false
        this.setState({employees: employeeList})
    }
    nextTimer = index => {
        const { employees } = this.state
        let employeeList = _.clone(employees)
        let status = false
        _.keys(employeeList).map(i => {
            if (status) {
                employeeList[i].timerPaused = false
                status = false
            } else {
                employeeList[i].timerPaused = true
            }
            if (i === index) status = true
        })
        this.setState({employees: employeeList}, () => setTimeout(() => {
            this.forceUpdate()
        }, 100))
        
    }
    render() {
        const { employees, timer } = this.state
        if (!employees) return <SMLoader />
        const employeeList = isEmpty(employees)
        ? 'Employee list is empty'
        : _.keys(employees).map((index, position) => {
            if (!employees[index].availability) return
            let fullName = position + 1 + '. ' + employees[index].firstName + ' ' + employees[index].lastName
            return (
                <ListItem 
                    key={position} 
                    primaryText={fullName} 
                    onClick={() => this.startTimer(index)} 
                    rightIcon={
                        !employees[index].timerPaused ?
                        <ReactCountdownClock 
                            weight={10}
                            seconds={timer}
                            paused={employees[index].timerPaused}
                            onComplete={() => this.nextTimer(index)}
                            size={50}
                        /> :
                        <div></div>
                    } 
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
    shuffle = employees => {
        let keys = Object.keys(employees),
            newEmployees = {}
        keys.sort((a,b) => Math.random() - 0.5)
        keys.map((k, i) => { 
            employees[k].timerPaused = i === 0 ? false : true
            newEmployees[k] = employees[k]
        })
        return newEmployees
    }
}