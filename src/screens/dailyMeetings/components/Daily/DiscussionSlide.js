import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export default class DiscussionSlide extends Component {
  render() {
    const { daily } = this.props;
    return (
      <div style={{ backgroundColor: daily.team.color }} className="page-overlay">
        <div className="daily-text text-center">
          <div>
After Daily Discussion
          </div>
          <div>
Questions? Inputs? Suggestions?
          </div>
        </div>
      </div>
    );
  }

	static propTypes = {
	  daily: PropTypes.object,
	}
}
