import React from 'react'
import Moment from 'react-moment'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

export default class ScrumDailyCreation extends React.Component {
    componentDidMount() {

    }
    createDaily = () => {
        const { history, firebase, employees, profile } = this.props
        const filteredEmployeeList = _.filter(employees, {availability: true})
        firebase.push(`dailyMeetings`, {
            employees: this.shuffle(filteredEmployeeList),
            teamId: profile.teamId
        }).then(daily => {
            firebase.updateProfile({
                currentDaily: daily.key,
            })
            history.push(`/daily/${daily.key}/intro`)
        })
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
    render() {
        const { profile } = this.props
        return (
            <div className="row"> 
                <RaisedButton
                    onClick={this.createDaily} 
                    primary
                    label="Create scrum daily meeting" 
                />
                {
                    profile.currentDaily ?
                    <RaisedButton
                        primary
                        label="Join daily meeting"
                        containerElement={<Link to={`daily/${profile.currentDaily}/intro`} />} 
                    />:
                    ''
                }
            </div>
        )
    }
}