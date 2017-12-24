import React from 'react'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'

export default class UserAvatar extends React.Component {
    render() {
        const { name, avatar, signOut, uid } = this.props
        const link = "/user/" + uid
        return (
            <div>
                <Avatar src={avatar} size={30} />
                <span>{name}</span>
                <IconMenu
                    className="sub-menu"
                    iconButtonElement={
                    <IconButton touch={true}>
                        <NavigationExpandMoreIcon />
                    </IconButton>
                    }
                >
                    <MenuItem primaryText="Profile" containerElement={<Link to={link} />} />
                    <MenuItem onClick={() => signOut()} primaryText="Logout" />
                </IconMenu>
            </div>
        )
    }
}