import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App';
import AddEmployee from './components/Employees/AddEmployee'
import Header from './components/Header/Header'
import registerServiceWorker from './registerServiceWorker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
global.jQuery = require('jquery')
global.Tether = require('tether')
require('bootstrap')
import './sass/index.scss'
import 'react-notifications/lib/notifications.css'
import {grey900} from 'material-ui/styles/colors';
import {NotificationContainer} from 'react-notifications'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey900
  }
})
ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router basename="/">
        <div className="layout-container">
            <Header />
            <Route exact path="/" component={App} />
            <Route exact path="/add" component={AddEmployee} />
            <NotificationContainer/>
        </div>
      </Router>
    </MuiThemeProvider>,
    document.getElementById('root'))
  registerServiceWorker()