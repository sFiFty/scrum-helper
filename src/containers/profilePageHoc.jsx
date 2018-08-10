import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SMLoader from 'Components/SMLoader';

const propTypes = {
  profileObj: PropTypes.shape({
    [PropTypes.string]: PropTypes.object,
  }),
};

const defaultProps = {
  profileObj: null,
};

export default (WrappedComponent) => {
  class ProfilePageHoc extends PureComponent {
    render() {
      const { profileObj } = this.props;
      return (
        profileObj
          ? <WrappedComponent {...this.props} />
          : <SMLoader />
      );
    }
  }

  ProfilePageHoc.propTypes = propTypes;
  ProfilePageHoc.defaultProps = defaultProps;

  return ProfilePageHoc;
};
