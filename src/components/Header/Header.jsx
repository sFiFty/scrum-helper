import React, { Component } from 'react';
import {
  Container, Image, Label, Icon,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import Navigation from 'Components/Navigation';
import Auth from 'Components/Auth';
import './styles.scss';

export default class Header extends Component {
  state = {
    isMobileMenuShown: false,
  }

  // show mobile menu
  show = () => this.setState({ isMobileMenuShown: true })

  // hide mobile menu
  hide = () => this.setState({ isMobileMenuShown: false })

  render() {
    const { isMobileMenuShown } = this.state;
    return (
      <header>
        <Container fluid className="desktop-menu">
          <div className="d-flex justify-content-start">
            <div className="p-2">
              <div className="logo-container">
                <Image
                  as={Link}
                  alt="Scrum Helper"
                  title="Scrum Helper"
                  to="/"
                  src={require('Images/logo.png')}
                />
                <Label className="beta-label" size="mini" color="black" ribbon>BETA</Label>
              </div>
            </div>
            <div className="p-2 align-self-center">
              <Navigation {...this.props} />
            </div>
            <div className="ml-auto p-2 align-self-center">
              <Auth />
            </div>
          </div>
        </Container>
        <Container className="mobile-menu d-flex align-items-center justify-content-between">
          {
            isMobileMenuShown
            && (
            <div className="vertical-menu-container">
              <div className="menu-overlay" onClick={this.hide} />
              <Navigation hideMenu={this.hide} vertical {...this.props} />
            </div>
            )
          }
          <Icon onClick={isMobileMenuShown ? this.hide : this.show} className="burger-icon" name="bars" size="large" />
          <div className="logo-container">
            <Image
              as={Link}
              alt="Scrum Helper"
              title="Scrum Helper"
              to="/"
              src={require('Images/logo.png')}
            />
            <Label className="beta-label" size="mini" color="black" ribbon>BETA</Label>
          </div>
          <div className="align-self-center">
            <Auth />
          </div>
        </Container>
      </header>
    );
  }
}
