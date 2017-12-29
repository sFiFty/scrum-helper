import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import _ from 'lodash'
import './add-employee.scss'

const block = {
    display: 'block'
}

export default class AddEmployee extends React.Component {
    state = {
        firstName: '',
        lastName: ''
    }

    render() {
        const { history, firebase, users, profile } = this.props
         return (
            
            <Paper zDepth={2} className="add-employee-wrapper row justify-content-md-center">
                <div className="col-3">
                    <TextField
                        style={block}
                        id="first-name"
                        hintText="First Name"
                        value={this.state.firstName}
                        onChange={this.setFirstName.bind(this)}
                    />
                    <TextField
                        style={block}
                        id="last-name"
                        hintText="Last Name"
                        value={this.state.lastName}
                        onChange={this.setLastName.bind(this)}
                    />
                    <RaisedButton style={block} primary onClick={this.addEmployee} label="Add Employee" />
                </div> 
            </Paper>
        )
    }

    setFirstName = event => {
        this.setState({firstName: event.target.value})
    }
    setLastName = event => {
        this.setState({lastName: event.target.value})
    }

    addEmployee = () => {
        const { history, firebase, users, profile } = this.props
        const { firstName, lastName, location } = this.state
        let profileId = null
        _.keys(users).map(k => {
            if (users[k].email === profile.email) {
                profileId = k
            }
        })
        const newEmployee = {
            'firstName': firstName,
            'lastName': lastName,
            'availability': true,
        }
        if (profile.teamId) {
            firebase.push(`teams/${profile.teamId}/employees`, newEmployee)
        } else {
            firebase.push('teams/', {
                employees: [
                    newEmployee
                ]
            }).then(team => {
                firebase.updateProfile({
                    teamId: team.key,
                })
            })
        }
        history.push('/')
    }
}