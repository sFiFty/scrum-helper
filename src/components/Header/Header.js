import React from 'react'
import {Container, Image} from 'semantic-ui-react'
import Navigation from 'Components/Navigation'
import Auth from 'Components/Auth'
import './styles.scss'

export default class Header extends React.Component {
  render() {
    const {location} = this.props
    return (
      <header>
        <Container fluid>
          <div className="d-flex justify-content-end">
            <div className="p-2">
              <div className="logo-container">
                <Image
                  alt="Scrum Helper"
                  title="Scrum Helper"
                  src={require('Images/logo.png')}
                />
              </div>
            </div>
            <div className="p-2 align-self-center"><Navigation location={location} /></div>
            <div className="ml-auto p-2 align-self-center"><Auth /></div>
          </div>
        </Container>
      </header>
    )
  }
}