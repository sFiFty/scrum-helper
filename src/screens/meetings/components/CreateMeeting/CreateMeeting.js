import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './styles.scss'

export default class CreateMeeting extends Component {
  render() {
    return (
      <Container className="create-meeting-container">
        <h1>Which type of the meeting you want to create?</h1>
        <div className="meeting-types d-flex justify-content-center align-items-center">
          <Link to="/daily/create">
            <div className="create-meeting-box daily">
              Create daily meeting
            </div>
          </Link>
          <Link to="/estimation/create">
            <div className="create-meeting-box estimation">
              Create estimation meeting
            </div>
          </Link>
        </div>
      </Container>
    )
  }
}

