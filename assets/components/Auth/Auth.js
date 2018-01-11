import React from 'react'
import UserAvatar from '../UserAvatar/UserAvatar'
import { Button, Icon } from 'semantic-ui-react'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import SMLoader from '../SMLoader/SMLoader'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {Tabs, Tab} from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'


export default class Auth extends React.Component {
    state = {
        open: false,
        email: null,
        password: null,
        slideIndex: 0
    }
    static propTypes = {
        firebase: PropTypes.shape({
          login: PropTypes.func.isRequired
        }),
        auth: PropTypes.object
    }

    signInGoogle = () => {
        const { firebase } = this.props
        firebase.login({ provider: 'google', type: 'popup' })
    }

    signInSimple = () => {
        const { firebase } = this.props
        const { email, password } = this.state
        firebase.createUser({ email: email, password: password }).catch(e => {
            console.log(    e)
        })
    }

    setEmail = event => this.setState({email: event.target.value})

    setPassword = event => this.setState({password: event.target.value})

    handleOpen = () => this.setState({open: true})
   
    handleClose = () => this.setState({open: false})

    changeIndex = value => this.setState({slideIndex: value})

    render() {
        let isAuthorized = false
        const { auth, firebase } = this.props
        const { slideIndex } = this.state
        const actions = [
            <FlatButton
              label={slideIndex === 0 ? 'Login' : 'Register'}
              primary
              keyboardFocused={true}
              onClick={this.signInSimple}
            />
        ]
        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                        <Tabs
                            onChange={this.changeIndex}
                            value={slideIndex}
                        >
                            <Tab label="Login" value={0} />
                            <Tab label="Register" value={1} />
                        </Tabs>
                        <SwipeableViews
                            index={slideIndex}
                            onChangeIndex={this.changeIndex}
                        >
                            <div>
                                <TextField
                                    onChange={this.setEmail.bind(this)}
                                    hintText="Email"
                                    floatingLabelText="Email"
                                />
                                <br />
                                <TextField
                                    onChange={this.setPassword.bind(this)}
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    type="password" 
                                />
                            </div>
                            <div>
                                <TextField
                                    onChange={this.setEmail.bind(this)}
                                    hintText="Email"
                                    floatingLabelText="Email"
                                />
                                    <br />
                                <TextField
                                    onChange={this.setPassword.bind(this)}
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    type="password" 
                                />
                                <TextField
                                    onChange={this.setPassword.bind(this)}
                                    hintText="Confirm password"
                                    floatingLabelText="Confirm password"
                                    type="password" 
                                />
                            </div>
                        </SwipeableViews>

                </Dialog>
                {
                    !isLoaded(auth) 
                    ? <SMLoader size="xs" />
                    : isEmpty(auth)
                    ? 
                    <div>
                        <Button onClick={this.signInGoogle} circular color='google plus' icon='google plus' />
                        <Button onClick={this.handleOpen} circular icon='mail' />
                    </div> 
                    : <UserAvatar signOut={() => { firebase.auth().signOut() }} uid={auth.uid} name={auth.displayName} avatar={auth.photoURL} />
                }
            </div>

        )
    }
}

