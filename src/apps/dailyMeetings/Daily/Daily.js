import React, {Component} from 'react'
import {isLoaded} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import IntroSlide from './IntroSlide'
import QueueSlide from './QueueSlide'

import './styles.scss'

export default class Daily extends Component {
  render() {
    const {daily} = this.props
    return (
      isLoaded(daily) ?
      <QueueSlide daily={daily} />
      : 
      <SMLoader />
    )
  }
}