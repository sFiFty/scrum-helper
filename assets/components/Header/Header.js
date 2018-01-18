import React from 'react'
import {Container, Image} from 'semantic-ui-react'
import Navigation from '../Navigation/Navigation'
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
                                src={require('../../img/logo.png')} 
                                srcSet='/assets/images/wireframe/image.png 2x'
                            />
                        </div>
                    </div>
                    <Navigation />
                </Container>
            </header>
        )
    }
}