import React, { PureComponent } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const propTypes = {
  daily: PropTypes.shape({
    team: PropTypes.shape({
      color: PropTypes.string,
    }),
  }),
};

export default class IntroSlide extends PureComponent {
  render() {
    const { daily } = this.props;
    return (
      <div style={{ backgroundColor: daily.team.color }} className="page-overlay">
        <div className="daily-text text-center">
          <div>{daily.team.name} Daily</div>
          <div>
            <Moment format="DD MMMM YYYY" />
          </div>
        </div>
      </div>
    );
  }
}

IntroSlide.propTypes = propTypes;
