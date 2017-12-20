import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const inputStyle = {
    display: 'block'
}
export default class AddEmployee extends React.Component {
    state = {
        firstName: '',
        lastName: '',
    }
    render() {
        return (
            <div>
                <form>
                    <TextField
                        id="first-name"
                        hintText="First Name"
                        value={this.state.firstName}
                        style={inputStyle}
                        onChange={this.setFirstName.bind(this)}
                    />
                    <TextField
                        id="last-name"
                        hintText="Last Name"
                        value={this.state.lastName}
                        style={inputStyle}
                        onChange={this.setLastName.bind(this)}
                    />
                </form>
                <RaisedButton primary onClick={this.addEmployee} label="Add Employee" />
            </div>
        )
    }

    setFirstName = event => {
        this.setState({firstName: event.target.value})
    }
    setLastName = event => {
        this.setState({lastName: event.target.value})
    }

    addEmployee = () => {
        const { history, firebase } = this.props
        const { firstName, lastName, location } = this.state
        const newEmployee = {
            'firstName': firstName,
            'lastName': lastName,
            'availability': true
        }
        firebase.push('employees', newEmployee)
        history.push('/')
    }
}