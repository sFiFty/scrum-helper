import React from 'react'
import UserAvatar from '../UserAvatar/UserAvatar'
import AuthDialog from './AuthDialog'
import SMLoader from '../SMLoader/SMLoader'
import RaisedButton from 'material-ui/RaisedButton'
import {Button} from 'semantic-ui-react'
import {isLoaded, isEmpty} from 'react-redux-firebase'
import PropTypes from 'prop-types'
import './auth.scss'



export default class Auth extends React.Component {
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
        console.log(this.props)
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
                    ? 
                    <div>
                        <RaisedButton onClick={this.dialogOpen} primary label="Sign in" />
                    </div> 
                    : <UserAvatar signOut={() => {firebase.auth().signOut()}} uid={auth.uid} name={auth.displayName} avatar={auth.photoURL} />
                }
            </div>

        )
    }
}

