import React, {Component} from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

export default class DiscussionSlide extends Component {
  render() {
    const {daily, nextStep} = this.props
    return (
      <div onClick={nextStep} style={{backgroundColor: daily.team.color}} className="page-overlay">
        <div className="daily-text text-center">
          <div>After Daily Discussion</div>
          <div>Questions? Inputs? Suggestions?</div>
        </div>
      </div>
    )
  }

	static propTypes = {
    daily: PropTypes.object.isRequired,
    nextStep: PropTypes.func.isRequired
	}
}
