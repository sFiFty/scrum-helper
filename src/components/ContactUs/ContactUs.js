import React, {Component} from 'react'
import {Container, Image, Button, List} from 'semantic-ui-react'

export default class ContactUs extends Component {

  state = {
    isDialogOpened: true,
  }

	render() {
		return (
      <Container>
        Contact Us
      </Container>
		)
  }
}