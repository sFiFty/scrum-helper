import React from 'react'

export default class Finishing extends React.Component {
    nextStep = () => {
        const { firebase, profile } = this.props
        firebase.remove(`dailyMeetings/${profile.currentDaily}`).then(() => {
            firebase.updateProfile({
                currentDaily: null
            })
        })
    }
    render() {
        return (
            <div className="text-wrapper" onClick={this.nextStep}> 
                <div className="daily-text">Let's go back to work</div>
            </div>
        )
    }
}