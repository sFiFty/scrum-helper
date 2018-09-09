import React, { Component } from 'react';
import {
  Input, Image, Popup, Button,
} from 'semantic-ui-react';

import DefaultAvatars from 'Components/DefaultAvatars';

class AddTeamMembers extends Component {
  render() {
    return (
      <div className="d-flex justify-content-start align-items-center">
        <Input
          onChange={this.onSetName}
          value={name || ''}
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
                avatar
                && <Image avatar src={require(`Images/${avatar}`)} />
              }
              <span className={avatar && 'ml-2'}>Choose avatar</span>
            </Button>
          )}
        >
          <DefaultAvatars selectedAvatar={avatar} onChoose={this.onSetAvatar} />
        </Popup>
        {
        avatar && name
          && (
            <Button onClick={this.addMember} className="ml-3" size="mini" secondary>
              <span>Add</span>
            </Button>
          )
        }
      </div>
    );
  }
}

export default AddTeamMembers;