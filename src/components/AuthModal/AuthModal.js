import React, {Component} from 'react'
import {Tab, Modal} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import {firebase} from 'react-redux-firebase'
import './styles.scss'

export default class AuthModal extends Component {

  state = {
    isDialogOpened: false,
  }

  loginWithFB = () => {
    const {firebase, redirectTo} = this.props
    firebase.login({provider: 'facebook', type: 'popup'}).then(() => {
      if (redirectTo) redirectTo(location.search)
    })
  }

  loginWithGoogle = () => {
    const {firebase, redirectTo} = this.props
    firebase.login({provider: 'google', type: 'popup'}).then(() => {
      if (redirectTo) redirectTo(location.search)
    })
  }
  
  login = (email, password) => {
    const {firebase, redirectTo} = this.props
    firebase.login({email: email, password: password}).then(() => {
      if (redirectTo) redirectTo(location.search)
    }).catch(error => {
      if (error.code === 'auth/user-not-found') {
        this.setState({errorMessage: "Sorry, we can't find an account with this email address"})
        return
      }
      if (error.code === 'auth/wrong-password') {
        this.setState({errorMessage: "Incorrect password. Please try again."})
        return
      }
      this.setState({errorMessage: error.message})
    })
  }

  componentWillMount() {
    const {auth, redirectTo} = this.props
    if (auth.isLoaded && !auth.isEmpty && redirectTo) {
      if (redirectTo) redirectTo(location.search)
    }
  }
  
  render() {
    const {dialogClose, firebase, isDialogOpened} = this.props
    const panes = [
      { menuItem: 'Log In', render: () => 
        <Tab.Pane className="auth-tab" attached={false}>
          <LoginForm 
            login={this.login}
            loginWithFB={this.loginWithFB} 
            loginWithGoogle={this.loginWithGoogle} />
        </Tab.Pane> 
      },
      { menuItem: 'Sign In', render: () => 
        <Tab.Pane className="auth-tab" attached={false}>
          <RegistrationForm 
            firebase={firebase} 
            loginWithFB={this.loginWithFB} 
            loginWithGoogle={this.loginWithGoogle} />
        </Tab.Pane> },
      ]
    return (
      <Modal
        className="auth-dialog"
        size="mini"
        open={isDialogOpened}
        onClose={dialogClose}>
        <Tab className="auth-tabs" menu={{secondary: true, pointing: true}} panes={panes} />
      </Modal>
    )
  }
  
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    isDialogOpened: PropTypes.bool,
    dialogOpen: PropTypes.func,
    redirectTo: PropTypes.func
  }
}