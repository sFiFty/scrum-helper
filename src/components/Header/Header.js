import React from 'react'
import {Container, Image} from 'semantic-ui-react'
import Navigation from 'Components/Navigation'
import './styles.scss'

export default class Header extends React.Component {
  render() {
    const {location} = this.props
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
          <Navigation location={location} />
        </Container>
      </header>
    )
  }
}