import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Container} from 'semantic-ui-react'
import './styles.scss'

export default class Home extends Component {
  render() {
    const {auth} = this.props
    return (
      <Container className="home-page">
        <div className="head">
          <div className="main-block">
            <h1>Welcome to the Scrum Helper </h1>
            <div className="seconary-text">
              We are in beta now but we have something for you.
            </div>
          </div>
        </div>
      </Container>
    )
  }

  static propTypes = {
    auth: PropTypes.object
  }
}

