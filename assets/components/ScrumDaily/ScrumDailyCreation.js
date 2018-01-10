import React from 'react'
import Moment from 'react-moment'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'
import Intro from './Intro'
import Shuffling from './Shuffling'
import Finishing from './Finishing'
import { isLoaded, firebase } from 'react-redux-firebase'
import SMLoader from '../SMLoader/SMLoader'

export default class ScrumDailyCreation extends React.Component {
    state = {
        isDailyStarted: false
    }
    createDaily = () => {
        const { firebase, team, profile } = this.props
        const filteredEmployeeList = _.filter(team.employees, {availability: true})
        firebase.push(`dailyMeetings`, {
            employees: filteredEmployeeList,
            teamId: profile.teamId,
            step: 1
        }).then(daily => {
            firebase.updateProfile({
                currentDaily: daily.key
            })
        })
    }
    goToNextStep = () => {
        const { profile, firebase, daily } = this.props
        firebase.update(`dailyMeetings/${profile.currentDaily}`, { step: ++daily.step })
    }
    joinDaily = () => this.setState({ isDailyStarted: true })
    render() {
        const { team, profile, daily, firebase } = this.props
        const { isDailyStarted } = this.state
        let currentStep = null
        if (daily) {
            switch(daily.step) {
                case 1: 
                    currentStep = <Intro goToNextStep={this.goToNextStep} team={team} />
                    break
                case 2: 
                    currentStep = <Shuffling goToNextStep={this.goToNextStep} employees={daily.employees} />
                    break
                case 3: 
                    currentStep = <Finishing firebase={firebase} profile={profile} />
                    break
                default: 
                    currentStep = null
                }
        }

        return (
            <div className="row"> 
                { isDailyStarted ? currentStep : '' }
                {
                    !daily || (daily && daily.step === 0) ? 
                    <RaisedButton
                        onClick={this.createDaily} 
                        primary
                        label="Create scrum daily meeting" 
                    /> : ''
                }
                {
                    profile.currentDaily && daily && !isDailyStarted ?
                    <RaisedButton
                        primary
                        label="Join daily meeting"
                        onClick={this.joinDaily}
                    />:
                    ''
                }
            </div>
        )
    }
}