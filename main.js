import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CoreLayout from 'Components/CoreLayout'
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