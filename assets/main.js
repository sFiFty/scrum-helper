import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppContainer from './containers/AppContainer'
global.jQuery = require('jquery')
global.Tether = require('tether')
require('bootstrap')
import './sass/index.scss'
import { Provider } from 'react-redux'
import store from './store'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(
    <Provider store={store}>
        <Router basename="/">
            <Switch>
                <Route path="/" component={AppContainer} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()