import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CoreLayout from 'Components/CoreLayout'
global.jQuery = require('jquery')
global.Tether = require('tether')
require('bootstrap')
import 'Styles/index.scss'
import {Provider} from 'react-redux'
import store from './src/store'

ReactDOM.render(
  <Provider store={store}>
    <Router basename="/">
      <Route path="/" component={CoreLayout} />
    </Router>
  </Provider>,
  document.getElementById('root')
)