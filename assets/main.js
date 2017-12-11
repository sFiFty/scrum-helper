import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker'
global.jQuery = require('jquery')
global.Tether = require('tether')
require('bootstrap')
import './sass/index.scss'
import 'react-notifications/lib/notifications.css'
import {NotificationContainer} from 'react-notifications'

ReactDOM.render(
      <Router basename="/">
        <div className="layout-container">
            <h1 className="h1 mt-3">My Helper</h1>
            <Route exact path="/" component={App} />
            <NotificationContainer/>
        </div>
      </Router>,
    document.getElementById('root'))
  registerServiceWorker()