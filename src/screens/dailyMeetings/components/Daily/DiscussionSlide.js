import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  daily: PropTypes.shape({
    team: PropTypes.shape({
      color: PropTypes.string,
    }),
  }),
};

export default class DiscussionSlide extends PureComponent {
  render() {
    return (
      <div style={{ backgroundColor: this.props.daily.team.color }} className="page-overlay">
        <div className="daily-text text-center">
          <div>After Daily Discussion</div>
          <div>Questions? Inputs? Suggestions?</div>
        </div>
      </div>
    );
  }
}

DiscussionSlide.propTypes = propTypes;
