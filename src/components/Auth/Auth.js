import React, {Component} from 'react'
import UserAvatar from 'Components/UserAvatar'
import AuthDialog from './AuthDialog'
import SMLoader from 'Components/SMLoader'
import {Button} from 'semantic-ui-react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import PropTypes from 'prop-types'
import './styles.scss'

export default class Auth extends Component {
  state = {
    isDialogOpened: false,
  }

  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    auth: PropTypes.object
  }
  
  dialogOpen = () => this.setState({isDialogOpened: true})

  dialogClose = () => this.setState({isDialogOpened: false})

  render() {
    let isAuthorized = false
    const {auth, firebase, history} = this.props
    return (
      <div>
        <AuthDialog 
          firebase={firebase} 
          history={history}
          dialogClose={this.dialogClose} 
          isDialogOpened={this.state.isDialogOpened} 
        />
        {
          !isLoaded(auth) 
          ? <SMLoader size="xs" />
          : isEmpty(auth)
          ? <Button type="submit" onClick={this.dialogOpen} secondary>Sign In</Button>
          : <UserAvatar signOut={() => {firebase.auth().signOut()}} uid={auth.uid} name={auth.displayName} avatar={auth.photoURL} />
        }
      </div>
    )
  }
}

