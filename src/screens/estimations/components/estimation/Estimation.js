import React, {Component} from 'react'
import {isLoaded} from 'react-redux-firebase'
import PropTypes from 'prop-types'
import SMLoader from 'Components/SMLoader'
import { Container } from 'semantic-ui-react';

export default class Daily extends Component {


  render() {
    const {estimation} = this.props
    console.log(estimation);
    return (
      <Container>
       Estimation
      </Container>
    )
  }

	static propTypes = {
		estimationId: PropTypes.string.isRequired,
		estimation: PropTypes.object,
		firebase: PropTypes.object.isRequired
	}
}