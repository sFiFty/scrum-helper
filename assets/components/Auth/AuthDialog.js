import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SwipeableViews from 'react-swipeable-views'
import {Tabs, Tab} from 'material-ui/Tabs'
import PropTypes from 'prop-types'
import validator from 'validator'

export default class AuthDialog extends React.Component {
    state = {
        open: false,
        slideIndex: 0,
        email: null,
        emailErrorText: null,
        password: null,
        firstName: null,
        lastName: null
    }

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        isDialogOpened: PropTypes.bool.isRequired,
        dialogClose: PropTypes.func.isRequired
    }

    setEmail = event => {
        if (validator.isEmail(_.trim(event.target.value))) {
            this.setState({
                email: _.trim(event.target.value),
                emailErrorText: null
            })
        } else {
            this.setState({
                emailErrorText: 'Please provide the correct email'
            })
        }
    }

    setPassword = event => {
        if (_.trim(event.target.value).length > 6) {
            this.setState({
                password: _.trim(event.target.value),
                passwordErrorText: null
            })
        } else {
            this.setState({
                passwordErrorText: 'Enter a combination of at least 6 numbers, letters and punctuation marks (like ! and &)'
            })
        }
    }

    confirmPassword = event => this.setState({confirmedPassword: event.target.value})

    setFirstName = event => this.setState({firstName: event.target.value})

    setLastName = event => this.setState({lastName: event.target.value})

    changeIndex = value => this.setState({slideIndex: value})
       
    onRegister = () => {
        const {firebase} = this.props
        const {email, password, confirmedPassword, firstName, lastName} = this.state

        // firebase.createUser({email: email, password: password}).catch(e => {
        //     console.log(    e)
        // })
    }

    onLogin = () => {

    }

    render() {
        const {slideIndex, emailErrorText, passwordErrorText} = this.state
        const {isDialogOpened, dialogClose} = this.props
        const actions = [
            <FlatButton
              label={slideIndex === 0 ? 'Login' : 'Register'}
              primary
              keyboardFocused={true}
              onClick={slideIndex === 0 ? this.onRegister : this.onLogin}
            />
        ]
        return (
            <Dialog
                className="auth-dialog"
                actions={actions}
                modal={false}
                open={isDialogOpened}
                onRequestClose={dialogClose}
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
                    <div className="row auth-container">
                        <div className="col text-center">
                            <TextField
                                onChange={this.setEmail.bind(this)}
                                hintText="Email"
                                floatingLabelText="Email"
                                errorText={emailErrorText}
                            />
                            <br />
                            <TextField
                                onChange={this.setPassword.bind(this)}
                                hintText="Password"
                                floatingLabelText="Password"
                                type="password" 
                                errorText={passwordErrorText}
                            />
                        </div>
                    </div>
                    <div className="row auth-container">
                        <div className="col">
                            <TextField
                                onChange={this.setEmail.bind(this)}
                                hintText="Email"
                                floatingLabelText="Email"
                            />
                            <TextField
                                onChange={this.setPassword.bind(this)}
                                hintText="Password"
                                floatingLabelText="Password"
                                type="password" 
                            />
                            <TextField
                                onChange={this.confirmPassword.bind(this)}
                                hintText="Confirm password"
                                floatingLabelText="Confirm password"
                                type="password" 
                            />
                        </div>
                        <div className="col pt-4">
                            <TextField
                                onChange={this.setFirstName.bind(this)}
                                hintText="First name"
                                floatingLabelText="First name"
                            />
                            <TextField
                                onChange={this.setLastName.bind(this)}
                                hintText="Last name"
                                floatingLabelText="Last name"
                            />          
                        </div>
                    </div>
                </SwipeableViews>
            </Dialog>
        )
    }
}