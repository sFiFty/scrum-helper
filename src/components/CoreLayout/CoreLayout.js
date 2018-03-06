import React, {Component} from 'react'
import Header from 'Components/Header'
import Footer from 'Components/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {NotificationContainer} from 'react-notifications'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {grey900} from 'material-ui/styles/colors'
import {isLoaded} from 'react-redux-firebase'
import PropTypes from 'prop-types'
import SMLoader from 'Components/SMLoader'
import Routes from './Routes'
import store from '../../store'
import actions from '../../actions'


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900
  }
})

export default class CoreLayout extends Component {

  componentDidMount () {
    const {firebase} = this.props

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(actions.AUTH_USER(user))
      } else {
        store.dispatch(actions.SIGN_OUT_USER())
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    const {profile, location} = this.props
    return (
      !isLoaded(profile) 
      ? <SMLoader />
      : 
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="layout-container row">
          <Header location={location} />
          <Routes />
          <Footer />
          <NotificationContainer/>
        </div>
      </MuiThemeProvider>
    )
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }
}

