import React from 'react'
import {List, ListItem} from 'material-ui/List'
import _ from 'lodash'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './employee-list.scss'


export default class EmployeeList extends React.Component {
    render() {  
        const { employees } = this.props
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
            </Paper>
        )
    }
}