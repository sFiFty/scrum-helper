import React from 'react'
import UserAvatar from '../UserAvatar/UserAvatar'
import { Button, Icon } from 'semantic-ui-react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import SMLoader from '../SMLoader/SMLoader'


export default class Auth extends React.Component {
    static propTypes = {
        firebase: PropTypes.shape({
          login: PropTypes.func.isRequired
        }),
        auth: PropTypes.object
    }

    signIn = () => {
        const { firebase } = this.props
        firebase.login({ provider: 'google', type: 'popup' })
    }

    render() {
        let isAuthorized = false
        const { auth, firebase } = this.props
        return (
            <div>
                {
                    !isLoaded(auth) 
                    ? <SMLoader size="xs" />
                    : isEmpty(auth)
                    ? <Button onClick={this.signIn} circular color='google plus' icon='google plus' /> 
                    : <UserAvatar signOut={() => { firebase.auth().signOut() }} uid={auth.uid} name={auth.displayName} avatar={auth.photoURL} />
                }
            </div>

        )
    }
}
