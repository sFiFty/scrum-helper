import React, {Component} from 'react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import SMLoader from 'Components/SMLoader'
import {Container} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './styles.scss'

const propTypes = {
  estimationId: PropTypes.string.isRequired,
  firebase: PropTypes.object.isRequired,
  estimation: PropTypes.object,
  auth: PropTypes.object
}
export default class Gathering extends Component {
  render() {
    return (
      <Container className="gathering-container">
      gathering
      </Container>
    )
  }
}

Gathering.propTypes = propTypes