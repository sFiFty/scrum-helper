import React, { PureComponent } from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './styles.scss';

export default class CreateMeeting extends PureComponent {
  render() {
    return (
      <Container className="create-meeting-container">
        <h1>
Which type of the meeting you want to create?
        </h1>
        <div className="meeting-types d-flex justify-content-center align-items-center text-center">
          <div className="create-meeting-box d-flex flex-column justify-content-start">
            <Link to="/daily/create">
              <div className="icon-container d-flex align-items-center justify-content-center">
                <div className="icon-background d-flex align-items-center justify-content-center">
                  <img src={require('Images/daily-type-ico.svg')} alt="Daily type icon" />
                </div>
              </div>
              <div className="font-m daily">

                Create daily meeting
              </div>
            </Link>
          </div>
          <div className="create-meeting-box d-flex flex-column justify-content-start text-center">
            <Link to="/estimation/create">
              <div className="icon-container d-flex align-items-center justify-content-center">
                <div className="icon-background d-flex align-items-center justify-content-center">
                  <img src={require('Images/estimation-type-ico.svg')} alt="Estimation type icon" />
                </div>
              </div>
              <div className="font-m estimation">

                Create estimation meeting
              </div>
            </Link>
          </div>
        </div>
      </Container>
    );
  }
}
