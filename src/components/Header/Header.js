import React from 'react'
import PropTypes from 'prop-types'
import {Container, Image, Label} from 'semantic-ui-react'
import Navigation from 'Components/Navigation'
import {Link} from 'react-router-dom'
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
                  as={Link}
                  alt="Scrum Helper"
                  title="Scrum Helper"
                  to="/"
                  src={require('Images/logo.png')}
                />
                <Label className="beta-label" size="mini" color='black' ribbon>BETA</Label>
              </div>
            </div>
            <div className="p-2 align-self-center"><Navigation location={location} /></div>
            <div className="ml-auto p-2 align-self-center"><Auth /></div>
          </div>
        </Container>
      </header>
    )
  }
  static propTypes = {
    auth: PropTypes.object
  }
}