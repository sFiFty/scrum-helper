import React from 'react'

export default class Intro extends React.Component {
    nextStep = () => {
        this.props.history.push('/daily/shuffling')
    }
    render() {
        return (
            <div className="text-wrapper" onClick={this.nextStep}> 
                <div className="daily-text">Silhouette Daily</div>
            </div>
        )
    }
}