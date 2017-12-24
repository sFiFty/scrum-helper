import React from 'react'
import Paper from 'material-ui/Paper'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import './navigation.scss'
import Auth from './Auth'

export default class Navigation extends React.Component {
    render() {
        return (
            <Paper className="navigation-wrapper col-9">
                <div className="row">
                    <div className="col-9">
                        <Menu className="navigation col-9" >
                            <div className="row">
                                <MenuItem className="col" primaryText="My team" containerElement={<Link to="/" />} />
                                <MenuItem className="col" primaryText="Add team member" containerElement={<Link to="/add" />} />
                                <MenuItem className="col" primaryText="Scrum daily" containerElement={<Link to="/daily" />} />
                            </div>
                        </Menu>
                    </div>
                    <Auth/>
                </div>
            </Paper>
        )
    }
}