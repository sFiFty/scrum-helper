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


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900
  }
})

export default class CoreLayout extends Component {
  render() {
    const {profile} = this.props
    return (
      !isLoaded(profile) 
      ? <SMLoader />
      : 
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="layout-container row">
          <Header />
          <Routes />
          <Footer />
          <NotificationContainer/>
        </div>
      </MuiThemeProvider>
    )
  }

  static propTypes = {
    profile: PropTypes.object.isRequired
  }
}

