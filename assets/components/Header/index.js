import React from 'react'
import {Container, Image} from 'semantic-ui-react'
import Navigation from 'Components/Navigation'
import firebase from '../../firebase/db'
import './header.scss'

export default class Header extends React.Component {
	render() {
		return (
			<header>
				<Container className="row d-flex align-items-center">
					<div className="col-3">
						<div className="logo-container">
							<Image
								alt="Scrum Helper"
								title="Scrum Helper"
								src={require('Images/logo.png')}
							/>
						</div>
					</div>
					<Navigation />
				</Container>
			</header>
		)
	}
}