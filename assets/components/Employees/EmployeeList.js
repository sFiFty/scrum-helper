import React from 'react'
import {List, ListItem} from 'material-ui/List'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import firebase from '../../firebase/db'
import RaisedButton from 'material-ui/RaisedButton'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './employee-list.scss'

export default class Match extends React.Component {
    state = {
        employees: {}
    }
    componentWillMount() {
        firebase.database().ref('employees').on('value', snapshot => {
            this.setState({employees: snapshot.val()})
        })
    }
    render() {  
        const { employees } = this.state
        let i = 0
        return (
            <Paper zDepth={2}>
                <List className="employee-list">
                    <ReactCSSTransitionGroup
                        transitionName="shuffle"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}>
                            {
                                _.values(employees).map((e, index)=> {
                                    i++
                                    let fullName = i + '. ' + e.firstName + ' ' + e.lastName
                                    return (
                                        <ListItem
                                            key={index}
                                            primaryText={fullName}
                                        />
                                    )
                                })
                            }
                        
                    </ReactCSSTransitionGroup>
                </List>
                <RaisedButton primary onClick={this.shuffle} label="Shuffle" />
            </Paper>
        )
    }

    shuffle = () => {
        let { employees } = this.state
        let keys = Object.keys(employees);
        let newEmployees = {}
        keys.sort((a,b) => Math.random() - 0.5)
        keys.map(k => {
            newEmployees[k] = employees[k]
        })
        this.setState({employees: {}})
        setTimeout(() => {
            this.setState({employees: newEmployees})
        }, 500);
        
    }

}