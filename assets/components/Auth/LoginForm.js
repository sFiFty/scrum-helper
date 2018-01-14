import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Divider, Form, Label, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import validator from 'validator'

export default class LoginForm extends React.Component {
    state = {
        email: null,
        password: null,
    }

    static propTypes = {
        firebase: PropTypes.object.isRequired,
    }

    validateEmail = event => {
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

    setPassword = event => this.setState({password: _.trim(event.target.value)})
       
    onLogin = () => {
        const {firebase} = this.props
        const {email, password} = this.state

        // firebase.createUser({email: email, password: password}).catch(e => {
        //     console.log(    e)
        // })
    }

    render() {
        const {emailErrorText, passwordErrorText} = this.state
        return (
            <div className="row auth-container">
                <div className="col text-center">
                    <Form>
                        <Form.Field inline>
                            <input type='text' placeholder='Email' />
                            <Label basic color='red' pointing='left'>That name is taken!</Label>
                        </Form.Field>
                        <Form.Field inline>
                            <Label basic color='red' pointing='right'>Your password must be 6 characters or more</Label>
                            <input type='password' placeholder='Password' />
                        </Form.Field>
                        <RaisedButton primary label="Log In" fullWidth={true} />
                    </Form>
                </div>
            </div>
        )
    }
}