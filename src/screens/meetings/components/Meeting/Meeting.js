import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './styles.scss'

const propTypes = {
  meeting: PropTypes.object.isRequired
}

export default class Meeting extends Component {

  render() {
    const { meeting } = this.props
    console.log(meeting)
    return (
      <div className="meeting">
        <div className="owner-avatar">
          
        </div>
      </div>
    )
  }
}

Meeting.propTypes = propTypes