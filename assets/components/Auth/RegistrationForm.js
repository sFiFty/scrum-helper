import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Divider, Form, Label, Input } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import validator from 'validator'

export default class RegistrationForm extends React.Component {
    state = {
        email: null,
        emailErrorText: null,
        password: null,
        passwordErrorText: null,
        firstName: null,
        firstNameErrorText: null,
        lastName: null,
        lastNameErrorText: null
    }

    static propTypes = {
        firebase: PropTypes.object.isRequired,
    }

    setFirstName = event => this.setState({firstName: event.target.value})
    setLastName = event => this.setState({lastName: event.target.value})
    setEmail = event => this.setState({email: event.target.value})
    setPassword = event => this.setState({password: event.target.value})

    validateEmail = email => {
        this.setState({
            passwordErrorText: !validator.isEmail(_.trim(email)) ? 'Please provide the correct email' : null
        })
    }

    validatePassword = password => {
        this.setState({
            passwordErrorText: _.trim(password).length < 6 ? 'Password must contain at least six characters' : null
        })
    }

    validateFirstName = firstName => {
        this.setState({
            firstNameErrorText: _.trim(firstName).length === 0 ? 'Please provide your first name' : null
        })
    }

    validateLastName = lastName => {
        this.setState({
            lastNameErrorText: _.trim(lastName).length === 0 ? 'Please provide your last name' : null
        })
    }

    validateForm = () => {
        const {email, password, firstName, lastName} = this.state
        this.validateEmail(email)
        // this.validatePassword(password)
        // this.validateFirstName(firstName)
        // this.validateLastName(lastName)
        const {emailErrorText, passwordErrorText, firstNameErrorText, lastNameErrorText} = this.state
        if (!emailErrorText || !passwordErrorText || !firstNameErrorText || !lastNameErrorText) return false
        return true
    }

    register = () => {
        const {email, password, firstName, lastName} = this.state
        this.validateFirstName(firstName)
        this.validateLastName(lastName)
        if (this.validateForm()) {
            console.log('ok')
            // firebase.createUser({email: email, password: password}).catch(e => {
            //     console.log(    e)
            // })
        }
    }

    render() {
        const {emailErrorText, passwordErrorText, firstNameErrorText, lastNameErrorText} = this.state
        return (
            <div className="row auth-container pt-4">
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
                        <RaisedButton primary label="Join" fullWidth={true} />
                    </Form>
                </div>
            </div>
        )
    }
}