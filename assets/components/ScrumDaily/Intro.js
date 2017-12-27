import React from 'react'
import Moment from 'react-moment'

export default class Intro extends React.Component {
    nextStep = () => {
        this.props.history.push('/daily/shuffling')
    }
    render() {
        const dateToFormat = new Date();
        return (
            <div className="text-wrapper" onClick={this.nextStep}> 
                <div className="daily-text">
                    Silhouette Daily
                    <div><Moment format="DD MMMM YYYY" date={dateToFormat} /></div>
                </div>
            </div>
        )
    }
}