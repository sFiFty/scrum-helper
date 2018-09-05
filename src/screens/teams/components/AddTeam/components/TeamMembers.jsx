import React from 'react';
import {
  Input, Image, Popup, Button,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import DefaultAvatars from 'Components/DefaultAvatars';

const propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired, 
  onAddMember: PropTypes.func.isRequired,
};

export default class TeamMembers extends React.Component {
  state = {
    name: null,
    avatar: null,
    isPopupOpen: false,
  }

  onSetName = event => this.setState({ name: event.target.value });

  onSetAvatar = (avatar) => {
    this.setState({ avatar });
    setTimeout(() => this.setState({ isPopupOpen: false }), 50);
  }

  onPopupClose = () => this.setState({ isPopupOpen: false });

  onPopupOpen = () => this.setState({ isPopupOpen: true });

  addMember = () => {
    const { name, avatar } = this.state;
    const { onAddMember } = this.props;
    onAddMember({ name, avatar });
  }

  render() {
    const { members } = this.props;
    const { name, isPopupOpen, avatar } = this.state;
    return (
      members
      && (
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
      )
    );
  }
}

TeamMembers.propTypes = propTypes;
