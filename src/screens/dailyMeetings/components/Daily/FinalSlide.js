import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  daily: PropTypes.shape({
    team: PropTypes.shape({
      color: PropTypes.string,
    }),
  }),
};

export default class FinalSlide extends PureComponent {
  render() {
    return (
      <div style={{ backgroundColor: this.props.daily.team.color }} className="page-overlay">
        <div className="daily-text text-center">
          <div>Well Done!</div>
          <div>Let`s get back to work</div>
        </div>
      </div>
    );
  }
}

FinalSlide.propTypes = propTypes;
