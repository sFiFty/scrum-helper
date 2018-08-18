import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
	onChoose: PropTypes.func.isRequired,
	selectedAvatar: PropTypes.string,
}

export default class DefaultAvatars extends React.Component {
	state = {
	  defaultAvatarsList: [],
	  selectedAvatar: null,
	}

	componentDidMount() {
	  const { selectedAvatar } = this.props;
	  const { defaultAvatarsList } = this.state;
	  if (defaultAvatarsList.length !== 0) return;
	  const list = [];
	  for (let i = 1; i <= 12; i++) {
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
	  const selectedAvatar = `default_avatar_${selectedIndex + 1}.svg`;

	  defaultAvatarsList.map((avatar, index) => {
	    avatar.selected = selectedIndex === index;
	  });

	  this.props.onChoose(selectedAvatar);

	  this.setState({
	    defaultAvatarsList,
	    selectedAvatar,
	  });
	}

	render() {
	  return (
			<div className="member-avatars-container">
				{
					this.state.defaultAvatarsList.map((avatar, index) => (
						<div
							className={avatar.selected ? 'selected member-avatar' : 'member-avatar'}
							key={index}
							onClick={() => this.selectAvatar(index)}
						>
							<img src={avatar.src} />
						</div>
					))
				}
			</div>
	  );
	}
}

DefaultAvatars.propTypes = propTypes;
