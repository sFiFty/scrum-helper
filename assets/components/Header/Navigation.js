import React from 'react'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import './navigation.scss'

const paperStyle = {
    display: 'inline-block',
    margin: '16px 32px 16px 40px',
    width: 'auto',
    verticalAlign: 'middle'
}

export default class Navigation extends React.Component {
    render() {
        return (
            <Paper style={paperStyle}>
                <Menu className="navigation">
                    <MenuItem primaryText="List" containerElement={<Link to="/" />} />
                    <MenuItem primaryText="Add" containerElement={<Link to="/add" />} />
                    <MenuItem primaryText="Scrum daily" containerElement={<Link to="/daily" />} />
                </Menu>
            </Paper>
        )
    }
}