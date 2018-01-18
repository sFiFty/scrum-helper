import React from 'react'
import { Divider, Form, Input, Button, Icon, Message } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class LoginForm extends React.Component {
    state = {
        email: null,
        password: null,
        errorMessage: null
    }

    static propTypes = {
        firebase: PropTypes.object.isRequired,
    }

    setEmail = event => this.setState({email: event.target.value})
    setPassword = event => this.setState({password: event.target.value})
       
    login = () => {
        const {firebase} = this.props
        const {email, password} = this.state
        firebase.login({email: email, password: password}).catch(error => {
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

    render() {
        const {errorMessage} = this.state
        const {loginWithGoogle, loginWithFB} = this.props
        return (
            <div className="auth-container text-center pt-4">
                <Form className="auth-form">
                    {
                        errorMessage ?
                        <Message color='red'>{errorMessage}</Message>
                        : ''
                    }
                    <Form.Field inline>
                        <label className="text-left">Email</label>
                        <input onChange={this.setEmail} type='text'/>
                    </Form.Field>
                    <Form.Field inline>
                        <label className="text-left">Password (6 or more characters)</label>
                        <input onChange={this.setPassword} type='password'/>
                    </Form.Field>
                    <Button type="submit" onClick={this.login} secondary>Log In</Button>
                    <Divider />
                    <Form.Field inline>
                        <Button onClick={loginWithGoogle} color='google plus'>
                            <Icon name='google plus' /> Log in with Google
                        </Button>
                    </Form.Field>
                    <Form.Field inline>
                        <Button onClick={loginWithFB} color='facebook'>
                            <Icon name='facebook' /> Log in with Facebook
                        </Button>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}