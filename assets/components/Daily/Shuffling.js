import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import EmployeeList from '../Employees/EmployeeList'
import firebase from '../../firebase/db'
import _ from 'lodash'
import Loader from 'react-loaders'

export default class Shuffling extends React.Component {
    state = {
        employees: {},
        loaded: false
    }
    componentWillMount() {
        firebase.database().ref('employees').on('value', snapshot => {
            let employees = this.shuffle(snapshot.val());
            let newEmployees = {}
            _.keys(employees).map(key => {
                if (employees[key].availability) {
                    newEmployees[key] = employees[key]
                }
            }) 
            this.setState({ loaded: true })
            setTimeout(() => {
                this.setState({ employees: newEmployees })
            }, 500)
        })
    }
    render() {
        const { loaded, employees } = this.state
        return (
            <div className="shuffling-layout"> 
                <div className="overlay"></div>
                <Loader active={!loaded} type="ball-clip-rotate-multiple" />
                <EmployeeList employees={employees} withToggle={false} />
                <RaisedButton className="shuffling-button" primary containerElement={<Link to="/daily/finishing" />} label="Finish" />
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