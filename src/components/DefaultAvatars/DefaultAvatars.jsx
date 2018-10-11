import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
  onChoose: PropTypes.func.isRequired,
  selectedAvatar: PropTypes.string,
};

const defaultProps = {
  selectedAvatar: null,
};

export default class DefaultAvatars extends React.Component {
  state = {
    defaultAvatarsList: [],
  }

  componentDidMount() {
    const { selectedAvatar } = this.props;
    const { defaultAvatarsList } = this.state;
    if (defaultAvatarsList.length !== 0) return;
    const list = [];
    for (let i = 1; i <= 13; i += 1) {
      const name = `default_avatar_${i}.svg`;
      list.push({
        name,
        src: require(`Images/${name}`),
        selected: name === selectedAvatar,
      });
    }
    this.setState({ defaultAvatarsList: list });
  }

  selectAvatar = (selectedIndex) => {
    const { defaultAvatarsList } = this.state;
    const { onChoose } = this.props;
    const selectedAvatar = `default_avatar_${selectedIndex + 1}.svg`;

    const avatarList = defaultAvatarsList.map((avatar, index) => {
      return {
        ...avatar,
        selected: selectedIndex === index,
      }
    });

    onChoose(selectedAvatar);

    this.setState({ defaultAvatarsList: avatarList });
  }

  render() {
    const { defaultAvatarsList } = this.state;
    return (
      <div className="member-avatars-container">
        {
          defaultAvatarsList.map((avatar, index) => (
            <div
              className={avatar.selected ? 'selected member-avatar' : 'member-avatar'}
              key={index}
              onClick={() => this.selectAvatar(index)}
            >
              <img src={avatar.src} alt="member avatar" />
            </div>
          ))
        }
      </div>
    );
  }
}

DefaultAvatars.propTypes = propTypes;
DefaultAvatars.defaultProps = defaultProps;
