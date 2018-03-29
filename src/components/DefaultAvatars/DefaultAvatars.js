import React from 'react'
import {Container, Header, Input, Form, Button, Message} from 'semantic-ui-react'
import {NotificationManager}  from 'react-notifications'
import PropTypes from 'prop-types'
import './styles.scss'

export default class DefaultAvatars extends React.Component {
	state = {
		defaultAvatarsList: [],
		avatar: null
  }
  
	componentDidMount() {
		if (this.state.defaultAvatarsList.length === 0) {
			let list = []
			for (let i = 1; i <= 12; i++) {
				list.push({
					src: require(`Images/default_avatar_${i}.svg`),
					selected: false
				})
			}
			this.setState({defaultAvatarsList: list})
		}
	}

	selectAvatar = (selectedIndex) => {
		const { defaultAvatarsList } = this.state
		defaultAvatarsList.map((avatar, index) => {
			avatar.selected = selectedIndex === index
    })
    
		this.setState({
			defaultAvatarsList: defaultAvatarsList, 
			avatar: `default_avatar_${selectedIndex + 1}.svg`
		})
	}
	render() {
		const {defaultAvatarsList, avatar} = this.state
		return (
			<div className="member-avatars-container">
        {
          defaultAvatarsList.map((avatar, index) => {
            return (
              <div 
                className={avatar.selected ? 'selected member-avatar' : 'member-avatar'} 
                key={index} 
                onClick={() => this.selectAvatar(index)}>
                <img src={avatar.src} />
              </div>
            )
          })
        }
			</div>
		)
  }
}