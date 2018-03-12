import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Container, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import AuthModal from 'Components/AuthModal'
import './styles.scss'

export default class Home extends Component {
  state = {
    authModalIsOpen: false,
    activeIndex: 0
  }

  authModalOpen = index => {
    this.setState({
      authModalIsOpen: true,
      index: typeof index === 'object' ? 0 : index
    })
  }

  authModalClose = () => this.setState({authModalIsOpen: false})

  render() {
    const {auth} = this.props
    const {authModalIsOpen, index} = this.state
    console.log(auth)
    return (
      <Container className="home-page">
        <div className="head">
          <div className="home-text-container">
            <h1 className="mb-2">Welcome to the Scrum Helper </h1>
            <div className="seconary-text text-light-black">
              We are in beta now but we have something for you.
            </div>
            <Button secondary size="large" onClick={() => this.authModalOpen(1)}>Join us</Button>
          </div>
          <div className="home-image-container">
            <Image
              alt="Scrum Team"
              title="Scrum Team"
              src={require('Images/home-image-top.png')}/>
          </div>
        </div>
        <div className="text-color mt-5">
        {
          isEmpty(auth) ?
          <div>
            To use our service we would like to ask you to 
            <span  > register</span> or 
            <span onClick={this.authModalOpen}> login.</span>
          </div>
          :
          <div>
            Let's create your first team!
          </div>
        }
        </div>
        <AuthModal 
          dialogClose={this.authModalClose} 
          isDialogOpened={authModalIsOpen} 
          activeIndex={index} />
      </Container>
    )
  }

  static propTypes = {
    auth: PropTypes.object
  }
}

