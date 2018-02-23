import React, {Component} from 'react'
import {isLoaded} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import IntroSlide from './IntroSlide'
import QueueSlide from './QueueSlide'
import DiscussionSlide from './DiscussionSlide'
import FinalSlide from './FinalSlide'

import './styles.scss'
import Divider from 'semantic-ui-react';

export default class Daily extends Component {

  nextStep = () => {
    const {daily, firebase, dailyId, history} = this.props
    if (daily.step === 3) {
      firebase.remove(`dailyMeetings/${dailyId}`).then(() => {
        history.push('/daily')
      })
      return
    }
    firebase.update(`dailyMeetings/${dailyId}`, { step: daily.step + 1 })
  }
  render() {
    const {daily} = this.props
    let currentSlide = <SMLoader />
    if (daily) {
      switch(daily.step) {
        case 0:
          currentSlide = <IntroSlide {...this.props} />
          break
        case 1:
          currentSlide =  <QueueSlide {...this.props} />
          break
        case 2:
          currentSlide =  <DiscussionSlide {...this.props} />
          break
        case 3:
          currentSlide =  <FinalSlide {...this.props} />
          break
        default:
          currentSlide =  <IntroSlide {...this.props} />
      }
    }

    return (
      <div onClick={this.nextStep} className="daily-layout">
        {currentSlide}
      </div>
    )
  }
}