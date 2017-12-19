import React from 'react'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import './navigation.scss'
import Auth from './Auth'


const paperStyle = {
    display: 'inline-block',
    margin: '16px 32px 16px 40px',
    width: 'auto',
    verticalAlign: 'middle'
}

export default class Navigation extends React.Component {
    render() {
        return (
            <Paper style={paperStyle} className="navigation-wrapper">
                <Menu className="navigation">
                    <MenuItem primaryText="My team" containerElement={<Link to="/" />} />
                    <MenuItem primaryText="Add team member" containerElement={<Link to="/add" />} />
                    <MenuItem primaryText="Scrum daily" containerElement={<Link to="/daily" />} />
                </Menu>
                <Auth />
            </Paper>
        )
    }
}