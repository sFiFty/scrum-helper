import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SMLoader from 'Components/SMLoader';

const propTypes = {
  teams: PropTypes.shape({
    [PropTypes.string]: PropTypes.object,
  }),
};

const defaultProps = {
  teams: null,
};

export default (WrappedComponent) => {
  class CreatePageHoc extends PureComponent {
    render() {
      const { teams } = this.props;
      return (
        teams
          ? <WrappedComponent {...this.props} />
          : <SMLoader />
      );
    }
  }

  CreatePageHoc.propTypes = propTypes;
  CreatePageHoc.defaultProps = defaultProps;

  return CreatePageHoc;
};
