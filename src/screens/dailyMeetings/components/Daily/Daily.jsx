import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SMLoader from 'Components/SMLoader';
import IntroSlide from './IntroSlide';
import QueueSlide from './QueueSlide.jsx';
import DiscussionSlide from './DiscussionSlide';
import FinalSlide from './FinalSlide';
import './styles.scss';

const propTypes = {
  dailyId: PropTypes.string.isRequired,
  daily: PropTypes.object,
  firebase: PropTypes.object.isRequired
}

class Daily extends Component {
  componentWillMount() {
    document.addEventListener("keydown", this.keyPress.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress.bind(this));
  }  

  componentWillReceiveProps(nextProps) {
    if (!nextProps.daily) this.props.history.push('/meetings')
  }

  keyPress = (e) => {
    if (e.keyCode === 37) {
      this.prevStep();
    } else if (e.keyCode === 39) {
      this.nextStep();
    }
  }

  nextStep = (e) => {
    if (e.target.nodeName === 'BUTTON') return;
    const {
      daily, firebase, dailyId, history,
    } = this.props;
    if (!daily) return;
    if (daily.step === 3) {
      firebase.update(`dailyMeetings/${dailyId}`, { isDeleted: true }).then(() => {
        history.push('/meetings');
      });
      return;
    }
    firebase.update(`dailyMeetings/${dailyId}`, { step: daily.step + 1 })
  }

  prevStep = () => {
    const {daily, firebase, dailyId} = this.props
    if (!daily) return
    if (daily.step === 0) return
    firebase.update(`dailyMeetings/${dailyId}`, { step: daily.step - 1 })
  }

  render() {
    const { daily } = this.props
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
      daily ?
      <div tabIndex="0" onClick={this.nextStep} className="daily-layout">
        {currentSlide}
      </div> : 
      <div tabIndex="0" onClick={this.nextStep} className="daily-layout">
        <SMLoader />
      </div>
    )
  }
}

Daily.propTypes = propTypes;

export default Daily;