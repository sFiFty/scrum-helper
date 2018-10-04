import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Image, Button } from 'semantic-ui-react';
import { isEmpty } from 'react-redux-firebase';
import Scrollchor from 'react-scrollchor';

import AuthModal from 'Components/AuthModal';
import WeOfferBox from 'Components/WeOfferBox';
import './styles.scss';

const propTypes = {
  auth: PropTypes.shape({
    isEmpty: PropTypes.bool,
  }),
};

const defaultProps = {
  auth: null,
};

export default class Home extends Component {
  state = {
    authModalIsOpen: false,
  }

  authModalOpen = (index) => {
    this.setState({
      authModalIsOpen: true,
      index: typeof index === 'object' ? 0 : index,
    });
  }

  authModalClose = () => this.setState({ authModalIsOpen: false })

  render() {
    const { auth } = this.props;
    const { authModalIsOpen, index } = this.state;
    return (
      <Container className="home-page">
        <div className="head">
          <div className="home-text-container">
            <h1 className="font-xxl mb-0">Welcome to the Scrum Helper</h1>
            <div className="secondary-text text-light-black font-m">
              We are in beta now but we have something for you.
            </div>
            <div className="buttons-container">
              {
                isEmpty(auth)
                && (
                <Button className="mr-3" secondary size="medium" onClick={() => this.authModalOpen(1)}>
                  Join us
                </Button>
                )
              }
              <Scrollchor to="weOffer">
                <Button basic size="medium">We offer</Button>
              </Scrollchor>
            </div>
          </div>
          <div className="home-image-container">
            <Image
              alt="Scrum Team"
              title="Scrum Team"
              src={require('Images/home-image-top.png')}
            />
          </div>
        </div>
        <hr className="horizontal-divider" />
          <WeOfferBox id="weOffer"/>
        <AuthModal
          dialogClose={this.authModalClose}
          isDialogOpened={authModalIsOpen}
          activeIndex={index}
        />
      </Container>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
