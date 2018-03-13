import React, {Component} from 'react'
import UserAvatar from 'Components/UserAvatar'
import AuthModal from 'Components/AuthModal'
import SMLoader from 'Components/SMLoader'
import {Button} from 'semantic-ui-react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import PropTypes from 'prop-types'

export default class Auth extends Component {

  state = {
    isDialogOpened: false
  }

  dialogOpen = () => this.setState({isDialogOpened: true})

  dialogClose = () => this.setState({isDialogOpened: false})

  render() {
    let isAuthorized = false
    const {auth, firebase, history} = this.props
    const {isDialogOpened} = this.state
    return (
      <div>
        <AuthModal history={history} dialogClose={this.dialogClose} isDialogOpened={isDialogOpened} />
        {
          !isLoaded(auth) 
          ? <SMLoader size="xs" />
          : isEmpty(auth)
          ? <Button size="mini" type="submit" onClick={this.dialogOpen} secondary>Sign In</Button>
          : <UserAvatar signOut={() => {firebase.auth().signOut()}} uid={auth.uid} name={auth.displayName} avatar={auth.photoURL} />
        }
      </div>
    )
  }

  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
  }
  
}

