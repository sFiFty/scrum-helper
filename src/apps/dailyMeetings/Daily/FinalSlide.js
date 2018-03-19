import React, {Component} from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

export default class FinalSlide extends Component {
  render() {
    const {daily} = this.props
    return (
      <div style={{backgroundColor: daily.team.color}} className="page-overlay">
        <div className="daily-text text-center">
          <div>Well Done!</div>
          <div>Let`s get back to work</div>
        </div>
      </div>
    )
  }

	static propTypes = {
    daily: PropTypes.object
	}
}
