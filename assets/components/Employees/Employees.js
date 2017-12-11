import React from 'react'
import Moment from 'react-moment'
import _ from 'lodash'
import db from '../../db'

export default class Match extends React.Component {
    state = {
        firstName: null,
        lastName: null,
        location: null,
        employees: {}
    }
    componentDidMount() {
        db.ref('employees').on('value', snapshot => {
            this.setState({employees: snapshot.val()})
        })
    }
    render() {
        const { employees } = this.state
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Location</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.values(employees).map((e, index)=> {
                                return (
                                    <tr key={index}>
                                        <td>{e.firstName} + {e.lastName}</td>
                                        <td>{e.location}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
                <form>
                    <input type="text" onChange={this.setFirstName.bind(this)} placeholder="firstName"/>
                    <input type="text" onChange={this.setLastName.bind(this)} placeholder="lastName"/>
                    <input type="text" onChange={this.setLocation.bind(this)} placeholder="location"/>
                </form>
                <button onClick={this.addEmployee}></button>
            </div>
        )
    }

    setFirstName = event => {
        this.setState({firstName: event.target.value})
    }
    setLastName = event => {
        this.setState({lastName: event.target.value})
    }
    setLocation = event => {
        this.setState({location: event.target.value})
    }

    addEmployee = () => {
        const { firstName, lastName, location } = this.state
        const employees = db.ref().child('employees')
        const primaryKey = new Date().getTime()
        employees.child(primaryKey).set({
            'firstName': firstName,
            'lastName': lastName,
            'location': location
        })
    }
}