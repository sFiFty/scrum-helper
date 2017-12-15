import React from 'react'
import ReactDOM from 'react-dom'
import EmployeeList from './components/Employees/EmployeeList'
import firebase from './firebase/db'

export default class App extends React.Component {
    state = {
        employees: {}
    }
    componentWillMount() {
        //this.props.startLoading()
        firebase.database().ref('employees').on('value', snapshot => {
            this.setState({employees: snapshot.val()})
            //this.props.endLoading()
        })
    }
    render() {
        const { startLoading, endLoading } = this.props
        return (
            <EmployeeList employees={this.state.employees} withToggle={true} />
        )
    }
}

