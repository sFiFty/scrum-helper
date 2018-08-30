import React, { PureComponent } from 'react';
import { Dropdown, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  avatar: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default class UserAvatar extends PureComponent {
  render() {
    const { avatar, signOut, uid } = this.props;
    const link = `/user/${uid}`;
    const trigger = avatar ? <Image src={avatar} avatar /> : <Icon size="big" name="user circle" />;
    return (
      <div>
        <Dropdown trigger={trigger}>
          <Dropdown.Menu>
            <Dropdown.Item text="Profile" as={Link} to={link} />
            <Dropdown.Item onClick={() => signOut()} icon="sign out" text="Sign out" />
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

UserAvatar.propTypes = propTypes;
