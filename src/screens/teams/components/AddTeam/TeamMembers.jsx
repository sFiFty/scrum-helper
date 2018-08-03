import React from 'react';
import {
  Input, Image, Popup, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DefaultAvatars from 'Components/DefaultAvatars';

const propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  memberName: PropTypes.string.isRequired,
  memberAvatar: PropTypes.string.isRequired,
  isPopupOpen: PropTypes.bool.isRequired,
};

export default class TeamMembers extends React.Component {
  render() {
    const {
      members, memberName, isPopupOpen, memberAvatar,
    } = this.props;
    return (
      members
      && (
        <div className="d-flex justify-content-start align-items-center">
          <Input
            onChange={this.setMemberName}
            value={memberName || ''}
            className="w-50"
            size="mini"
            placeholder="Type member name here..."
          />
          <Popup
            open={isPopupOpen}
            onOpen={this.onPopupOpen}
            onClose={this.onPopupClose}
            on="click"
            trigger={(
              <Button className="ml-3 d-flex justify-content-start align-items-center" size="mini" basic>
                {
                  memberAvatar
                  && <Image avatar src={require(`Images/${memberAvatar}`)} />
                }
                <span className={memberAvatar && 'ml-2'}>Choose avatar</span>
              </Button>
            )}
          >
            <DefaultAvatars selectedAvatar={memberAvatar} onChoose={this.setMemberAvatar} />
          </Popup>
          {
          memberAvatar && memberName
            && (
              <Button onClick={this.addMember} className="ml-3" size="mini" secondary>
                <span>Add</span>
              </Button>
            )
          }
        </div>
      )
    );
  }
}

TeamMembers.propTypes = propTypes;
