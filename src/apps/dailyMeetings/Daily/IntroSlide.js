import React, {Component} from 'react'
import Moment from 'react-moment'

export default class IntroSlide extends Component {
  render() {
    const {daily} = this.props
    return (
      <div style={{backgroundColor: daily.team.color}} className="page-overlay">
        <div className="daily-text text-center">
          <div>{daily.team.name} Daily</div>
          <div><Moment format="DD MMMM YYYY" /></div>
        </div>
      </div>
    )
  }
}
