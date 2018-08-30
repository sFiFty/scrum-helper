import React, { PureComponent } from 'react';
import Loader from 'react-loaders';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  size: PropTypes.string,
};

const defaultProps = {
  size: null,
};

export default class SMLoader extends PureComponent {
  render() {
    const { size } = this.props;
    const style = { transform: null };
    style.transform = size === 'xs' ? 'scale(0.25)' : 'scale(1)';
    return (
      <div className="loader-wrapper">
        <div className="overlay" />
        <Loader style={style} active type="ball-clip-rotate-multiple" />
      </div>
    );
  }
}

SMLoader.propTypes = propTypes;
SMLoader.defaultProps = defaultProps;
