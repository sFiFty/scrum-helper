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
  state = {
    joinedMembers: []
  }
  componentWillReceiveProps({estimation}) {
    if (estimation && estimation.joinedMembers) {
      let joinedMembers = []
      _.keys(estimation.joinedMembers).map(memberKey => {
        joinedMembers.push(
          {
            ...estimation.joinedMembers[memberKey]
          }
        )
      })
      this.setState({ joinedMembers: joinedMembers })
    }
  }
  render() {
    const {joinedMembers} = this.state

    return (
      <Container className="gathering-container">
      gathering
      </Container>
    )
  }
}

Gathering.propTypes = propTypes