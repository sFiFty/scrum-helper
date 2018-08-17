import React, { PureComponent } from 'react';

import { List, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default class AddListItemBox extends PureComponent {
  render() {
    const { link, label } = this.props;
    return (
      <List.Item>
        <Link to={link} className="text-color">
          <Icon circular size="large" name="add" />
          <span className="font-m pl-2">
            {label}
          </span>
        </Link>
      </List.Item>
    );
  }
}

AddListItemBox.propTypes = propTypes;
