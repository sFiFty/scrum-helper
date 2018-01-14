import React from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SwipeableViews from 'react-swipeable-views'
import {Tab} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'
import {firebase} from 'react-redux-firebase'

export default class AuthDialog extends React.Component {
    state = {
        open: false,
        slideIndex: 0,
    }

    static propTypes = {
        firebase: PropTypes.object.isRequired,
        isDialogOpened: PropTypes.bool.isRequired,
        dialogClose: PropTypes.func.isRequired
    }

    onAction = slideIndex => {
        if (slideIndex === 0) {
            console.log('login')
        } else {
            const form = new RegistrationForm()
            const {firebase} = this.props
            form.register(firebase)
        }
    }

    render() {
        const panes = [
            { menuItem: 'Log In', render: () => <Tab.Pane className="auth-tab" attached={false}><LoginForm firebase={firebase} /></Tab.Pane> },
            { menuItem: 'Join', render: () => <Tab.Pane className="auth-tab" attached={false}><RegistrationForm firebase={firebase} /></Tab.Pane> },
          ]
        const {slideIndex} = this.state
        const {isDialogOpened, dialogClose, firebase} = this.props
        return (
            <Dialog
                className="auth-dialog"
                modal={false}
                open={isDialogOpened}
                onRequestClose={dialogClose}
            >
                <Tab className="auth-container" menu={{ secondary: true, pointing: true }} panes={panes} />
            </Dialog>
        )
    }
}