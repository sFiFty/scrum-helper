import React from 'react'
import IconButton from 'material-ui/IconButton'
import AuthIcon from 'react-material-icons/icons/social/person-outline'
import firebase from '../../firebase/db'
import cookie from 'react-cookies'
import UserAvatar from './UserAvatar'

export default class Auth extends React.Component {
    state = {
        userName: null,
        provider: null,
        isAuthorized: false,
        avatar: null
    }
    componentDidMount() {
        let userId = cookie.load('userId')
        firebase.database().ref().child('users').once('value').then(snapshot => {
            let currentUser = snapshot.val()[userId]
            if (!currentUser) return
            this.setState({ 
                userName: currentUser.displayName,
                avatar: currentUser.avatar,
                isAuthorized: true
            })
        })
    }
    signOut = () => {
        firebase.auth().signOut().then(() => {
            cookie.remove('userId', { path: '/' })
            this.setState({ isAuthorized: false })
        })
    }
    auth = () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
        firebase.auth().signInWithPopup(provider).then(result => {
            const user = result.user;
            const users = firebase.database().ref().child('users')
            users.child(user.uid).set({
                'email': user.email,
                'displayName': user.displayName,
                'verificationType': 'google',
                'avatar': user.photoURL
            })
            cookie.save('userId', user.uid, { path: '/' })
            this.setState({userName: user.displayName})
            this.props.history.push('/')
          })
    }

    render() {
        const { isAuthorized, userName, avatar } = this.state
        return (
            isAuthorized ? 
            <UserAvatar signOut={this.signOut} name={userName} avatar={avatar} /> :
            <IconButton aria-label="Delete" onClick={this.auth}>
                <AuthIcon className="color-red button" />
            </IconButton>
        )
    }
}