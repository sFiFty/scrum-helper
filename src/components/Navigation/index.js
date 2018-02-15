import React from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './navigation.scss'
import AuthContainer from 'Containers/AuthContainer'

export default class Navigation extends React.Component {
	state = { 
		activeItem: null 
	}
	handleItemClick = (e, { name }) => {
		this.setState({activeItem: name})
	}
	componentWillMount() {
		switch(location.pathname) {
			case '/daily': 
				this.setState({activeItem: 'Daily'})
				break
			case '/teams': 
				this.setState({activeItem: 'My teams'})
				break
			default: 
				this.setState({activeItem: null})
				break
		}
	}
	render() {
		const {activeItem} = this.state
		return (
			<div className="navigation-wrapper col-9">
				<div className="row">
					<div className="col-9">
						<Menu pointing secondary>
							<Menu.Item as={Link} to="/teams" name='My teams' active={activeItem === 'My teams'} onClick={this.handleItemClick} />
							<Menu.Item as={Link} to="/daily" name='Daily' active={activeItem === 'Daily'} onClick={this.handleItemClick} />
							<Menu.Menu position='right'>
							</Menu.Menu>
						</Menu>
					</div>
					<div className="col-3 text-right avatar-container"><AuthContainer /></div>
				</div>
			</div>
		)
	}
}