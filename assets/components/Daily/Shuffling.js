import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import EmployeeList from '../Employees/EmployeeList'
import firebase from '../../firebase/db'

export default class Shuffling extends React.Component {
    state = {
        employees: {}
    }
    componentWillMount() {
        firebase.database().ref('employees').on('value', snapshot => {
            let employees = this.shuffle(snapshot.val());
            setTimeout(() => {
                this.setState({ employees: employees })
            }, 500)
        })
    }
    render() {
        return (
            <div> 
                <EmployeeList employees={this.state.employees} />
                <RaisedButton primary containerElement={<Link to="/daily/finishing" />} label="Finish" />
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