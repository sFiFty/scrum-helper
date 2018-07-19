import React, { Component } from 'react';
import {
  Container, Button, Form, TextArea,
} from 'semantic-ui-react';

const MAIL = 'alexandr.rudin.my@gmail.com';
const FACEBOOK_LINK = 'https://www.facebook.com/rudinaleksandr';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/rudin-aleksandr-11921576/';

export default class ContactUs extends Component {
  state = {
    message: true,
  }

  setMessage = event => this.setState({ message: event.target.value })

  render() {
    return (
      <Container className="text-center">
        <h2 className="form-title">
Send us a message
        </h2>
        <div className="font-m line-height-m mt-3">

          Hello, my name is Alex and I am the creator of Scrum Helper.
          If you have any questions or suggestions please don't hesitate to contact me.
        </div>
        <div className="socials mt-5">
          <a target="_blank" href={`mailto:${MAIL}`}>
            <Button size="huge" circular color="google plus" icon="google plus" />
          </a>
          <a target="_blank" href={FACEBOOK_LINK}>
            <Button className="ml-3" size="huge" circular color="facebook" icon="facebook" />
          </a>
          <a target="_blank" href={LINKEDIN_LINK}>
            <Button className="ml-3" size="huge" circular color="linkedin" icon="linkedin" />
          </a>
        </div>
      </Container>
    );
  }
}
