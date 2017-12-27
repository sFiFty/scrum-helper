import React from 'react'

export default class Finishing extends React.Component {
    nextStep = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <div className="text-wrapper" onClick={this.nextStep}> 
                <div className="daily-text">Let's go back to work</div>
            </div>
        )
    }
}